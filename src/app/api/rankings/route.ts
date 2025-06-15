// src/app/api/rankings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const minVotes = parseInt(searchParams.get('minVotes') || '0')

    // Offset calculation
    const offset = (page - 1) * limit

    // Base query
    let query = supabase
      .from('images')
      .select('id, title, url, description, elo_rating, total_votes, wins, losses, tags, created_at', { count: 'exact' })
      .eq('is_approved', true)
      .eq('is_nsfw', false)
      .gte('total_votes', minVotes)
      .order('elo_rating', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: images, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch rankings' },
        { status: 500 }
      )
    }

    if (!images) {
      return NextResponse.json({
        success: true,
        rankings: [],
        totalCount: 0,
        page,
        limit
      })
    }

    // Format data for ranking display
    const rankings = images.map((image, index) => ({
      rank: offset + index + 1,
      id: image.id,
      title: image.title || 'Untitled',
      imageUrl: image.url,
      elo: image.elo_rating,
      totalVotes: image.total_votes,
      wins: image.wins,
      losses: image.losses,
      winRate: image.total_votes > 0 ? Math.round((image.wins / image.total_votes) * 100) : 0,
      tags: image.tags || []
    }))

    return NextResponse.json({
      success: true,
      rankings,
      totalCount: count || 0,
      page,
      limit
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}