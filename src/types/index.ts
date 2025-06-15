// src/types/index.ts
// データベース型をインポート
export * from './database'

// 投票コンポーネント用の型
export interface VoteOption {
  id: string
  imageUrl: string
  title: string
  description?: string
  currentRating: number
}

export interface VoteResult {
  winner: VoteOption
  loser: VoteOption
  ratingChange: number
  newWinnerRating: number
  newLoserRating: number
}

// 既存のFacemash用型定義
export interface Character {
  id: string
  name: string
  imageUrl: string
  elo: number
  totalVotes: number
  wins: number
  losses: number
  winRate: number
  description?: string
  tags?: string[]
}

export interface MatchupResult {
  winnerId: string
  loserId: string
  newWinnerRating: number
  newLoserRating: number
  ratingChange: number
}

// API レスポンス型
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface GetRandomPairResponse {
  pair: [VoteOption, VoteOption]
}

export interface SubmitVoteResponse {
  result: VoteResult
  nextPair?: [VoteOption, VoteOption]
}

// ランキング用の型
export interface RankingItem {
  rank: number
  id: string
  title: string
  imageUrl: string
  elo: number
  totalVotes: number
  wins: number
  losses: number
  winRate: number
  tags?: string[]
}

export interface RankingResponse {
  rankings: RankingItem[]
  totalCount: number
  page: number
  limit: number
}

// フィルター・ソート用の型
export interface RankingFilters {
  tags?: string[]
  minVotes?: number
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface SortOptions {
  field: 'elo' | 'totalVotes' | 'winRate' | 'created_at'
  direction: 'asc' | 'desc'
}

// ページネーション用の型
export interface PaginationOptions {
  page: number
  limit: number
}

// 統計情報用の型
export interface Statistics {
  totalImages: number
  totalVotes: number
  averageRating: number
  topRatedImage: {
    id: string
    title: string
    rating: number
  }
  mostVotedImage: {
    id: string
    title: string
    votes: number
  }
}

// 画像アップロード用の型
export interface ImageUpload {
  file: File
  title: string
  description?: string
  tags?: string[]
}

export interface UploadResponse {
  success: boolean
  imageId?: string
  imageUrl?: string
  error?: string
}

// エラー型
export interface AppError {
  code: string
  message: string
  details?: any
}