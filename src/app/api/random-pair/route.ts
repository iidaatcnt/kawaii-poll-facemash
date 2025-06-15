// src/app/api/random-pair/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // 承認済みの画像からランダムに2つを取得
    const { data: images, error } = await supabase
      .from('images')
      .select('id, title, url, description, elo_rating')
      .eq('is_approved', true)
      .eq('is_nsfw', false)
      .limit(50) // パフォーマンスのため50件に制限

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch images' },
        { status: 500 }
      )
    }

    if (!images || images.length < 2) {
      return NextResponse.json(
        { error: 'Not enough images available' },
        { status: 404 }
      )
    }

    // ランダムに2つの異なる画像を選択
    const shuffled = images.sort(() => 0.5 - Math.random())
    const pair = shuffled.slice(0, 2)

    // VoteOption形式に変換
    const voteOptions = pair.map(image => ({
      id: image.id,
      imageUrl: image.url,
      title: image.title || 'Untitled',
      description: image.description || '',
      currentRating: image.elo_rating
    }))

    return NextResponse.json({
      success: true,
      pair: voteOptions
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}