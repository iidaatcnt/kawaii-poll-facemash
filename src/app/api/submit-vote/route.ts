// src/app/api/submit-vote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { winnerId, loserId } = body

    if (!winnerId || !loserId) {
      return NextResponse.json(
        { error: 'Winner ID and Loser ID are required' },
        { status: 400 }
      )
    }

    if (winnerId === loserId) {
      return NextResponse.json(
        { error: 'Winner and loser cannot be the same' },
        { status: 400 }
      )
    }

// IPアドレスとUser-Agentを取得
const headersList = await headers()
const forwardedFor = headersList.get('x-forwarded-for')
const realIp = headersList.get('x-real-ip')
const voterIp = forwardedFor?.split(',')[0] || realIp || 'unknown'
const userAgent = headersList.get('user-agent') || 'unknown'

    // Supabaseのprocess_vote関数を呼び出し
    const { data, error } = await supabase.rpc('process_vote', {
      winner_image_id: winnerId,
      loser_image_id: loserId,
      voter_user_id: null, // 今は匿名投票のみ
      voter_ip_address: voterIp
    })

    if (error) {
      console.error('Vote processing error:', error)
      return NextResponse.json(
        { error: 'Failed to process vote' },
        { status: 500 }
      )
    }

    // 更新後の画像情報を取得
    const { data: updatedImages, error: fetchError } = await supabase
      .from('images')
      .select('id, title, url, description, elo_rating')
      .in('id', [winnerId, loserId])

    if (fetchError) {
      console.error('Failed to fetch updated images:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch updated data' },
        { status: 500 }
      )
    }

    const winner = updatedImages?.find(img => img.id === winnerId)
    const loser = updatedImages?.find(img => img.id === loserId)

    if (!winner || !loser) {
      return NextResponse.json(
        { error: 'Failed to find updated images' },
        { status: 500 }
      )
    }

    // レスポンス形式を整える
    const result = {
      winner: {
        id: winner.id,
        imageUrl: winner.url,
        title: winner.title || 'Untitled',
        description: winner.description || '',
        currentRating: winner.elo_rating
      },
      loser: {
        id: loser.id,
        imageUrl: loser.url,
        title: loser.title || 'Untitled',
        description: loser.description || '',
        currentRating: loser.elo_rating
      },
      ratingChange: data.winner_rating_change,
      newWinnerRating: data.new_winner_rating,
      newLoserRating: data.new_loser_rating
    }

    return NextResponse.json({
      success: true,
      result
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}