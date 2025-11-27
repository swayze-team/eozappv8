"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Game = "fortnite" | "apex" | "valorant" | "cod"

export function StatsTracker() {
  const [game, setGame] = useState<Game>("fortnite")
  const [username, setUsername] = useState("")
  const [tag, setTag] = useState("")
  const [platform, setPlatform] = useState("epic")
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Veuillez entrer un nom d'utilisateur")
      return
    }

    if (game === "valorant" && !tag.trim()) {
      setError("Veuillez entrer votre tagline (ex: #EUW)")
      return
    }

    setLoading(true)
    setError("")
    setStats(null)

    try {
      let url = ""

      switch (game) {
        case "fortnite":
          url = `/api/trn/fortnite?username=${encodeURIComponent(username)}&platform=${platform}`
          break
        case "apex":
          url = `/api/trn/apex?username=${encodeURIComponent(username)}&platform=${platform}`
          break
        case "valorant":
          url = `/api/trn/valorant?username=${encodeURIComponent(username)}&tag=${encodeURIComponent(tag.replace("#", ""))}`
          break
        case "cod":
          url = `/api/trn/cod?username=${encodeURIComponent(username)}&platform=${platform}`
          break
      }

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok && data.data) {
        setStats(data.data)
        console.log("[v0] Stats loaded successfully:", data.data)
      } else {
        setError(data.error || "Joueur introuvable ou erreur API")
        console.log("[v0] Error from API:", data.error)
      }
    } catch (err) {
      setError("Erreur lors de la recherche des stats")
      console.error("[v0] Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  const renderFortniteStats = () => {
    if (!stats) return null

    const segments = stats.segments || []
    const overview = segments.find((s: any) => s.type === "overview")?.stats || {}

    return (
      <>
        {/* Player Info */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg">
              {stats.platformInfo?.platformUserIdentifier?.substring(0, 2).toUpperCase() || "FN"}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                {stats.platformInfo?.platformUserIdentifier || username}
              </h3>
              <p className="text-muted-foreground text-lg font-medium">Fortnite Battle Royale</p>
            </div>
          </div>
        </Card>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Wins", value: overview.wins?.displayValue || "0", icon: "🏆", color: "primary" },
            { label: "K/D Ratio", value: overview.kd?.displayValue || "0.00", icon: "⚔️", color: "accent" },
            { label: "Kills", value: overview.kills?.displayValue || "0", icon: "💀", color: "primary" },
            { label: "Win Rate", value: overview.winRate?.displayValue || "0%", icon: "📊", color: "accent" },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`p-6 bg-gradient-to-br from-${stat.color}/10 to-${stat.color}/5 border-${stat.color}/20 hover:border-${stat.color}/40 transition-all hover:scale-[1.02]`}
            >
              <div className="space-y-3">
                <div className="text-4xl">{stat.icon}</div>
                <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Stats */}
        <Card className="p-6">
          <h3 className="text-2xl font-bold mb-6 text-foreground">Statistiques détaillées</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: "Matches Jouées", value: overview.matches?.displayValue || "0" },
              { label: "Top 10", value: overview.top10?.displayValue || "0" },
              { label: "Top 5", value: overview.top5?.displayValue || "0" },
              { label: "Top 3", value: overview.top3?.displayValue || "0" },
              { label: "Kills/Match", value: overview.killsPerMatch?.displayValue || "0.00" },
              { label: "Minutes Jouées", value: overview.minutesPlayed?.displayValue || "0" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2 p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground font-mono">{stat.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </>
    )
  }

  const renderApexStats = () => {
    if (!stats) return null

    const segments = stats.segments || []
    const overview = segments.find((s: any) => s.type === "overview")?.stats || {}

    return (
      <>
        <Card className="p-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {stats.platformInfo?.platformUserIdentifier?.substring(0, 2).toUpperCase() || "AP"}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                {stats.platformInfo?.platformUserIdentifier || username}
              </h3>
              <p className="text-muted-foreground text-lg font-medium">Level {overview.level?.displayValue || "N/A"}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Kills", value: overview.kills?.displayValue || "0", icon: "🎯" },
            { label: "Damage", value: overview.damage?.displayValue || "0", icon: "💥" },
            { label: "Wins", value: overview.wins?.displayValue || "0", icon: "👑" },
            { label: "K/D", value: overview.kd?.displayValue || "0.00", icon: "📈" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/5 hover:scale-[1.02] transition-all"
            >
              <div className="space-y-3">
                <div className="text-4xl">{stat.icon}</div>
                <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </>
    )
  }

  const renderValorantStats = () => {
    if (!stats) return null

    const segments = stats.segments || []
    const overview = segments.find((s: any) => s.type === "overview")?.stats || {}

    return (
      <>
        <Card className="p-6 bg-gradient-to-br from-red-600/5 to-pink-500/5 border-red-600/20">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {stats.platformInfo?.platformUserIdentifier?.substring(0, 2).toUpperCase() || "VL"}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                {stats.platformInfo?.platformUserIdentifier || username}
              </h3>
              <p className="text-muted-foreground text-lg font-medium">
                Rank: {overview.peakRank?.displayValue || "Unranked"}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Wins", value: overview.matchesWon?.displayValue || "0", icon: "🏆" },
            { label: "Win Rate", value: overview.matchesWinPct?.displayValue || "0%", icon: "📊" },
            { label: "K/D", value: overview.kDRatio?.displayValue || "0.00", icon: "⚔️" },
            { label: "Headshot %", value: overview.headshotsPercentage?.displayValue || "0%", icon: "🎯" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-to-br from-red-600/10 to-pink-500/5 hover:scale-[1.02] transition-all"
            >
              <div className="space-y-3">
                <div className="text-4xl">{stat.icon}</div>
                <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </>
    )
  }

  const renderCODStats = () => {
    if (!stats) return null

    const segments = stats.segments || []
    const overview = segments.find((s: any) => s.type === "overview")?.stats || {}

    return (
      <>
        <Card className="p-6 bg-gradient-to-br from-green-600/5 to-emerald-500/5 border-green-600/20">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {stats.platformInfo?.platformUserIdentifier?.substring(0, 2).toUpperCase() || "WZ"}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                {stats.platformInfo?.platformUserIdentifier || username}
              </h3>
              <p className="text-muted-foreground text-lg font-medium">Call of Duty: Warzone</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Wins", value: overview.wins?.displayValue || "0", icon: "🎖️" },
            { label: "K/D", value: overview.kdRatio?.displayValue || "0.00", icon: "💀" },
            { label: "Kills", value: overview.kills?.displayValue || "0", icon: "🔫" },
            { label: "Win Rate", value: overview.wlPercentage?.displayValue || "0%", icon: "📈" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-to-br from-green-600/10 to-emerald-500/5 hover:scale-[1.02] transition-all"
            >
              <div className="space-y-3">
                <div className="text-4xl">{stat.icon}</div>
                <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </>
    )
  }

  const getPlatformOptions = () => {
    switch (game) {
      case "fortnite":
        return [
          { value: "epic", label: "Epic Games" },
          { value: "psn", label: "PlayStation" },
          { value: "xbl", label: "Xbox" },
        ]
      case "apex":
        return [
          { value: "origin", label: "Origin (PC)" },
          { value: "psn", label: "PlayStation" },
          { value: "xbl", label: "Xbox" },
        ]
      case "cod":
        return [
          { value: "battle", label: "Battle.net" },
          { value: "psn", label: "PlayStation" },
          { value: "xbl", label: "Xbox" },
        ]
      default:
        return []
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      <div className="space-y-3">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Multi-Game Stats Tracker</h2>
        <p className="text-muted-foreground text-lg md:text-xl font-medium">
          Powered by TRN Network - Statistiques en temps réel pour tous vos jeux
        </p>
      </div>

      {/* Game Selection */}
      <Tabs value={game} onValueChange={(v) => setGame(v as Game)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="fortnite" className="py-3 text-sm md:text-base">
            🎮 Fortnite
          </TabsTrigger>
          <TabsTrigger value="apex" className="py-3 text-sm md:text-base">
            🎯 Apex
          </TabsTrigger>
          <TabsTrigger value="valorant" className="py-3 text-sm md:text-base">
            🔫 Valorant
          </TabsTrigger>
          <TabsTrigger value="cod" className="py-3 text-sm md:text-base">
            💀 Warzone
          </TabsTrigger>
        </TabsList>

        {/* Search Form */}
        <TabsContent value={game} className="mt-6">
          <Card className="p-4 md:p-6 bg-gradient-to-br from-card to-secondary/20">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder={game === "valorant" ? "Nom d'utilisateur (sans #)" : "Nom d'utilisateur..."}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 h-12"
                />
                {game === "valorant" && (
                  <Input
                    placeholder="Tag (ex: EUW)"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full md:w-[140px] h-12"
                  />
                )}
                {game !== "valorant" && (
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="w-full md:w-[180px] h-12">
                      <SelectValue placeholder="Plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                      {getPlatformOptions().map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-primary text-primary-foreground h-12 px-8 font-semibold hover:scale-[1.02] transition-transform"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground"></div>
                      <span>Recherche...</span>
                    </div>
                  ) : (
                    "Rechercher"
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-destructive text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Stats Display */}
      {stats && (
        <div className="space-y-6">
          {game === "fortnite" && renderFortniteStats()}
          {game === "apex" && renderApexStats()}
          {game === "valorant" && renderValorantStats()}
          {game === "cod" && renderCODStats()}
        </div>
      )}

      {/* No Stats Message */}
      {!stats && !loading && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-6xl">🎮</div>
            <h3 className="text-2xl font-bold text-foreground">Recherchez vos statistiques</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Entrez votre nom d'utilisateur pour afficher vos statistiques en temps réel depuis TRN Network
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
