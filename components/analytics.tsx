"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export function Analytics() {
  const performanceData = [
    { day: "Lun", kills: 45, wins: 3, matches: 12 },
    { day: "Mar", kills: 52, wins: 4, matches: 15 },
    { day: "Mer", kills: 48, wins: 2, matches: 14 },
    { day: "Jeu", kills: 61, wins: 5, matches: 16 },
    { day: "Ven", kills: 55, wins: 4, matches: 13 },
    { day: "Sam", kills: 72, wins: 6, matches: 18 },
    { day: "Dim", kills: 68, wins: 5, matches: 17 },
  ]

  const kdData = [
    { week: "S1", solo: 2.3, duo: 2.6, squad: 2.8 },
    { week: "S2", solo: 2.5, duo: 2.7, squad: 3.0 },
    { week: "S3", solo: 2.4, duo: 2.8, squad: 3.1 },
    { week: "S4", solo: 2.6, duo: 2.9, squad: 3.2 },
  ]

  return (
    <div className="p-8 space-y-6 custom-scrollbar">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Analytics & Insights</h2>
        <p className="text-muted-foreground text-lg">Analyse détaillée de vos performances</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Moyenne Kills/Match", value: "8.4", trend: "+0.7", icon: "⚡" },
          { label: "Win Rate Tendance", value: "28.3%", trend: "+2.1%", icon: "📈" },
          { label: "Meilleur Streak", value: "7", trend: "Record", icon: "🔥" },
          { label: "Temps Survie Moy.", value: "14:32", trend: "+1:24", icon: "⏱️" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 hover:scale-[1.02] transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
              <p className="text-xs text-primary font-semibold">{stat.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Performance hebdomadaire</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.012 264)" />
            <XAxis dataKey="day" stroke="oklch(0.6 0.008 264)" />
            <YAxis stroke="oklch(0.6 0.008 264)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.11 0.012 264)",
                border: "1px solid oklch(0.2 0.012 264)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="kills" fill="oklch(0.7 0.2 195)" name="Kills" radius={[8, 8, 0, 0]} />
            <Bar dataKey="wins" fill="oklch(0.75 0.18 330)" name="Victoires" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* K/D Trend */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-6 text-foreground">Évolution K/D par mode</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={kdData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.012 264)" />
            <XAxis dataKey="week" stroke="oklch(0.6 0.008 264)" />
            <YAxis stroke="oklch(0.6 0.008 264)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.11 0.012 264)",
                border: "1px solid oklch(0.2 0.012 264)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="solo" stroke="oklch(0.7 0.2 195)" strokeWidth={3} name="Solo" />
            <Line type="monotone" dataKey="duo" stroke="oklch(0.75 0.18 330)" strokeWidth={3} name="Duo" />
            <Line type="monotone" dataKey="squad" stroke="oklch(0.65 0.18 150)" strokeWidth={3} name="Squad" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
            <span>💡</span> Points forts
          </h3>
          <ul className="space-y-3">
            {[
              "Excellente performance en Squad (+15% ce mois)",
              "K/D en constante amélioration",
              "Meilleur taux de victoire le weekend",
              "Progression constante sur 4 semaines",
            ].map((insight, index) => (
              <li key={index} className="flex items-start gap-3 text-foreground">
                <span className="text-primary mt-0.5">✓</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
          <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
            <span>🎯</span> Axes d'amélioration
          </h3>
          <ul className="space-y-3">
            {[
              "Augmenter le temps de survie en Solo",
              "Améliorer la consistance en milieu de semaine",
              "Travailler les rotations en fin de game",
              "Focus sur le placement top 5",
            ].map((insight, index) => (
              <li key={index} className="flex items-start gap-3 text-foreground">
                <span className="text-accent mt-0.5">→</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
