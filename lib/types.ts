// Type definitions for EOZ Esport Platform

export interface User {
  id: string
  username: string
  discriminator?: string
  avatar?: string
  email?: string
}

export interface FortniteStats {
  account?: {
    name: string
    level?: number
  }
  battlePass?: {
    level: number
  }
  stats?: {
    all?: {
      overall?: ModeStats
      solo?: ModeStats
      duo?: ModeStats
      squad?: ModeStats
    }
  }
}

export interface ModeStats {
  wins: number
  kills: number
  deaths: number
  kd: number
  matches: number
  winRate: number
  top3?: number
  top5?: number
  top10?: number
  top25?: number
}

export interface Ticket {
  id: string
  title: string
  description: string
  category: "technical" | "account" | "payment" | "other"
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
  messages: TicketMessage[]
}

export interface TicketMessage {
  id: string
  author: string
  isAdmin: boolean
  content: string
  timestamp: string
}

export interface ChatMessage {
  id: number
  user: string
  avatar: string
  message: string
  time: string
  isOwn: boolean
}

export interface LeaderboardPlayer {
  rank: number
  name: string
  points: number
  wins: number
  kd: number
  avatar: string
}

export interface NewsItem {
  title: string
  body: string
  image: string
}

export interface PerformanceData {
  day: string
  kills: number
  wins: number
  matches: number
}

export interface KDData {
  week: string
  solo: number
  duo: number
  squad: number
}
