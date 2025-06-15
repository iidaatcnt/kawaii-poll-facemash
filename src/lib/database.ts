// src/types/database.ts
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      images: {
        Row: {
          id: string
          filename: string
          url: string
          title: string | null
          description: string | null
          tags: string[] | null
          elo_rating: number
          total_votes: number
          wins: number
          losses: number
          uploader_id: string | null
          file_size: number | null
          dimensions: any | null
          is_approved: boolean
          is_nsfw: boolean
          approved_by: string | null
          approved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          filename: string
          url: string
          title?: string | null
          description?: string | null
          tags?: string[] | null
          elo_rating?: number
          total_votes?: number
          wins?: number
          losses?: number
          uploader_id?: string | null
          file_size?: number | null
          dimensions?: any | null
          is_approved?: boolean
          is_nsfw?: boolean
          approved_by?: string | null
          approved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          filename?: string
          url?: string
          title?: string | null
          description?: string | null
          tags?: string[] | null
          elo_rating?: number
          total_votes?: number
          wins?: number
          losses?: number
          uploader_id?: string | null
          file_size?: number | null
          dimensions?: any | null
          is_approved?: boolean
          is_nsfw?: boolean
          approved_by?: string | null
          approved_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          voter_id: string | null
          winner_id: string
          loser_id: string
          winner_rating_before: number
          winner_rating_after: number
          loser_rating_before: number
          loser_rating_after: number
          rating_change: number
          voter_ip: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          voter_id?: string | null
          winner_id: string
          loser_id: string
          winner_rating_before: number
          winner_rating_after: number
          loser_rating_before: number
          loser_rating_after: number
          rating_change: number
          voter_ip?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          voter_id?: string | null
          winner_id?: string
          loser_id?: string
          winner_rating_before?: number
          winner_rating_after?: number
          loser_rating_before?: number
          loser_rating_after?: number
          rating_change?: number
          voter_ip?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string | null
          image_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          image_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          image_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string | null
          image_id: string
          content: string
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          image_id: string
          content: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          image_id?: string
          content?: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      process_vote: {
        Args: {
          winner_image_id: string
          loser_image_id: string
          voter_user_id?: string
          voter_ip_address?: string
        }
        Returns: any
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// 便利な型エイリアス
export type User = Database['public']['Tables']['users']['Row']
export type Image = Database['public']['Tables']['images']['Row']
export type Vote = Database['public']['Tables']['votes']['Row']
export type Like = Database['public']['Tables']['likes']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']

export type InsertUser = Database['public']['Tables']['users']['Insert']
export type InsertImage = Database['public']['Tables']['images']['Insert']
export type InsertVote = Database['public']['Tables']['votes']['Insert']
export type InsertLike = Database['public']['Tables']['likes']['Insert']
export type InsertComment = Database['public']['Tables']['comments']['Insert']

export type UpdateUser = Database['public']['Tables']['users']['Update']
export type UpdateImage = Database['public']['Tables']['images']['Update']
export type UpdateVote = Database['public']['Tables']['votes']['Update']
export type UpdateLike = Database['public']['Tables']['likes']['Update']
export type UpdateComment = Database['public']['Tables']['comments']['Update']