"use client"

import { Card } from "@/components/ui/card"

export function TeamHistory() {
  return (
    <div className="p-8 space-y-6 custom-scrollbar">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Historique E-Sport</h2>
        <p className="text-muted-foreground text-lg">Revivez les moments forts de l'équipe EOZ</p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {[
          {
            date: "Novembre 2024",
            title: "Victoire Cash Cup",
            description:
              "L'équipe remporte la Cash Cup avec un total de 247 points et 28 éliminations. Performance exceptionnelle en end-game.",
            icon: "🏆",
            color: "primary",
            stats: { points: 247, kills: 28, placement: "1st" },
          },
          {
            date: "Octobre 2024",
            title: "Top 3 FNCS",
            description:
              "Qualification pour les finales FNCS - Performance remarquable avec une constance incroyable sur toutes les parties.",
            icon: "🥉",
            color: "accent",
            stats: { points: 198, kills: 42, placement: "3rd" },
          },
          {
            date: "Septembre 2024",
            title: "Nouveau membre",
            description:
              "EOZ_Delta rejoint l'équipe en tant que IGL (In-Game Leader). Son expérience apporte une nouvelle dynamique à l'équipe.",
            icon: "👋",
            color: "primary",
            stats: null,
          },
          {
            date: "Août 2024",
            title: "Record de kills",
            description: "37 kills en un seul match d'équipe - Nouveau record EOZ établi lors d'une session de scrims.",
            icon: "⚡",
            color: "accent",
            stats: { kills: 37, players: 100, duration: "23:45" },
          },
          {
            date: "Juillet 2024",
            title: "Création de l'équipe",
            description: "Fondation officielle d'EOZ Esport avec 4 membres fondateurs. Le début d'une grande aventure!",
            icon: "🎯",
            color: "primary",
            stats: null,
          },
        ].map((event, index) => (
          <div key={index} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg ${
                  event.color === "primary"
                    ? "bg-primary/20 border-2 border-primary/40"
                    : "bg-accent/20 border-2 border-accent/40"
                }`}
              >
                {event.icon}
              </div>
              {index < 4 && <div className="w-0.5 h-full bg-border mt-3"></div>}
            </div>
            <Card
              className={`flex-1 p-6 mb-6 hover:scale-[1.01] transition-all ${
                event.color === "primary" ? "border-primary/20" : "border-accent/20"
              }`}
            >
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{event.date}</p>
                <h3 className="text-2xl font-bold text-foreground">{event.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                {event.stats && (
                  <div className="flex gap-4 pt-3 border-t border-border">
                    {Object.entries(event.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 shadow-xl">
        <h3 className="text-3xl font-bold mb-8 text-foreground text-center">Achievements de l'équipe</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "🏆", label: "Tournois gagnés", value: "12", color: "primary" },
            { icon: "🎯", label: "Top 3 finishes", value: "24", color: "accent" },
            { icon: "⚡", label: "Total Kills", value: "15,234", color: "primary" },
            { icon: "💎", label: "Prize Pool", value: "€8,500", color: "accent" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-3 p-6 rounded-xl bg-card/50 hover:bg-card hover:scale-105 transition-all border border-border"
            >
              <div className="text-5xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Hall of Fame */}
      <Card className="p-8">
        <h3 className="text-3xl font-bold mb-8 text-foreground">Hall of Fame</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Most Valuable Player",
              player: "EOZ_Alpha",
              description: "Performance exceptionnelle avec 94 victoires ce mois",
              icon: "👑",
            },
            {
              title: "Best K/D Ratio",
              player: "EOZ_Gamma",
              description: "Ratio impressionnant de 3.8 sur les 30 derniers jours",
              icon: "⚔️",
            },
            {
              title: "Team Captain",
              player: "EOZ_Delta",
              description: "Leadership exemplaire en tant qu'IGL",
              icon: "🎖️",
            },
            {
              title: "Rising Star",
              player: "EOZ_Beta",
              description: "Progression la plus rapide ce trimestre",
              icon: "⭐",
            },
          ].map((award, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-to-br from-secondary/50 to-secondary/20 hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{award.icon}</div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">{award.title}</h4>
                  <p className="text-primary font-semibold">{award.player}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{award.description}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}
