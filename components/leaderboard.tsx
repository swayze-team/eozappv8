"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: "EOZ_Alpha", points: 2847, wins: 94, kd: 3.8, avatar: "🥇" },
    { rank: 2, name: "EOZ_Beta", points: 2654, wins: 87, kd: 3.5, avatar: "🥈" },
    { rank: 3, name: "EOZ_Gamma", points: 2431, wins: 76, kd: 3.2, avatar: "🥉" },
    { rank: 4, name: "EOZ_Delta", points: 2298, wins: 71, kd: 2.9, avatar: "🎯" },
    { rank: 5, name: "EOZ_Epsilon", points: 2156, wins: 68, kd: 2.7, avatar: "⚡" },
    { rank: 6, name: "EOZ_Zeta", points: 2034, wins: 64, kd: 2.5, avatar: "🔥" },
    { rank: 7, name: "EOZ_Eta", points: 1923, wins: 59, kd: 2.4, avatar: "💫" },
    { rank: 8, name: "EOZ_Theta", points: 1845, wins: 55, kd: 2.2, avatar: "✨" },
  ]

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Classement de l'équipe</h2>
        <p className="text-muted-foreground text-lg">Top performers du mois</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((player, idx) => {
          const heights = ["h-48", "h-40", "h-36"]
          const positions = [1, 0, 2]
          const actualIdx = positions[idx]
          const actualPlayer = leaderboardData[actualIdx]

          return (
            <Card
              key={actualPlayer.rank}
              className={`${heights[actualIdx]} flex flex-col justify-end p-6 bg-gradient-to-br ${
                actualIdx === 0
                  ? "from-primary/20 to-primary/5 border-primary/40 col-start-1 md:col-start-2 order-1 md:order-2"
                  : actualIdx === 1
                    ? "from-accent/20 to-accent/5 border-accent/40 order-2 md:order-1"
                    : "from-primary/10 to-primary/5 border-primary/20 order-3"
              } hover:scale-[1.02] transition-all relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 text-6xl opacity-20">{actualPlayer.avatar}</div>
              <div className="text-center space-y-2 relative z-10">
                <div className="text-5xl mb-2">{actualPlayer.avatar}</div>
                <h3 className="text-xl font-bold text-foreground">{actualPlayer.name}</h3>
                <p className="text-3xl font-bold text-foreground font-mono">{actualPlayer.points}</p>
                <p className="text-sm text-muted-foreground">points</p>
                <div className="flex justify-center gap-4 pt-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Wins: </span>
                    <span className="font-bold text-foreground">{actualPlayer.wins}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">K/D: </span>
                    <span className="font-bold text-foreground">{actualPlayer.kd}</span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Full Leaderboard */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Classement complet</h3>
        <div className="space-y-2">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-[1.01] ${
                player.rank <= 3
                  ? "bg-gradient-to-r from-primary/10 to-transparent border border-primary/20"
                  : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  player.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                #{player.rank}
              </div>
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-2xl">{player.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-bold text-foreground">{player.name}</p>
                <p className="text-sm text-muted-foreground">{player.points} points</p>
              </div>
              <div className="hidden sm:flex gap-8 text-sm">
                <div className="text-center">
                  <p className="font-bold text-foreground font-mono">{player.wins}</p>
                  <p className="text-xs text-muted-foreground">Victoires</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-foreground font-mono">{player.kd}</p>
                  <p className="text-xs text-muted-foreground">K/D Ratio</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
