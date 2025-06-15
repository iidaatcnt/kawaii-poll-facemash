// src/types/index.ts
export interface User {
  id: string
  email: string
  username: string
  display_name?: string
  avatar_url?: string
  bio?: string
  is_creator: boolean
  creator_verified: boolean
  created_at: string
  updated_at: string
}

export interface AIImage {
  id: string
  user_id: string
  title: string
  description?: string
  image_url: string
  thumbnail_url?: string
  ai_model?: string
  category?: string
  elo_rating: number
  vote_count: number
  win_count: number
  loss_count: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
  last_voted_at?: string
  user?: User
}

export interface Vote {
  id: string
  voter_id: string
  winner_id: string
  loser_id: string
  winner_elo_before: number
  winner_elo_after: number
  loser_elo_before: number
  loser_elo_after: number
  created_at: string
}

export interface VotingPair {
  image1: AIImage
  image2: AIImage
}

export interface RankingItem {
  rank: number
  image: AIImage
  rating_change?: number
}