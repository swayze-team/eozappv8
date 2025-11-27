"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsTracker } from "@/components/stats-tracker"
import { TeamHistory } from "@/components/team-history"
import { TeamChat } from "@/components/team-chat"
import { Settings } from "@/components/settings"
import { FortniteNews } from "@/components/fortnite-news"
import { Leaderboard } from "@/components/leaderboard"
import { Analytics } from "@/components/analytics"
import { TicketSystem } from "@/components/ticket-system"
import { AdminPanel } from "@/components/admin-panel"

interface DashboardProps {
  user: any
  onLogout: () => void
}

type View =
  | "dashboard"
  | "tracker"
  | "history"
  | "chat"
  | "settings"
  | "news"
  | "leaderboard"
  | "analytics"
  | "tickets"
  | "admin"

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [unreadTickets, setUnreadTickets] = useState(0)

  useEffect(() => {
    const loadTicketCount = async () => {
      try {
        const userToken = localStorage.getItem("eoz_user_token")
        if (userToken) {
          const response = await fetch(`/api/tickets?token=${userToken}`)
          if (response.ok) {
            const data = await response.json()
            const openTickets =
              data.tickets?.filter((t: any) => t.status === "open" || t.status === "in-progress").length || 0
            setUnreadTickets(openTickets)
          }
        }
      } catch (error) {
        console.error("[v0] Error loading ticket count:", error)
      }
    }
    loadTicketCount()
  }, [currentView])

  const menuItems = [
    {
      id: "dashboard" as View,
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "tracker" as View,
      label: "Stats Tracker",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "analytics" as View,
      label: "Analytics",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "leaderboard" as View,
      label: "Leaderboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      id: "tickets" as View,
      label: "Support",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      badge: unreadTickets > 0 ? unreadTickets : undefined,
    },
    ...(user.isAdmin
      ? [
          {
            id: "admin" as View,
            label: "Admin Panel",
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            ),
            adminOnly: true,
          },
        ]
      : []),
    {
      id: "history" as View,
      label: "Historique",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "news" as View,
      label: "Fortnite News",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      id: "chat" as View,
      label: "Chat",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      id: "settings" as View,
      label: "Paramètres",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  const renderContent = () => {
    switch (currentView) {
      case "tracker":
        return <StatsTracker />
      case "analytics":
        return <Analytics />
      case "leaderboard":
        return <Leaderboard />
      case "history":
        return <TeamHistory />
      case "news":
        return <FortniteNews />
      case "chat":
        return <TeamChat user={user} />
      case "tickets":
        return <TicketSystem user={user} />
      case "admin":
        return user.isAdmin ? <AdminPanel user={user} /> : <DashboardHome user={user} />
      case "settings":
        return <Settings user={user} onLogout={onLogout} />
      default:
        return <DashboardHome user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside
        className={`${sidebarCollapsed ? "md:w-20" : "md:w-72"} w-full md:min-h-screen bg-card border-b md:border-r border-border flex flex-col transition-all duration-300 scrollbar-thin overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-border">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary via-primary to-accent p-3 rounded-xl shadow-lg hover:scale-105 transition-transform border border-primary/30 relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-30 rounded-xl"></div>
                <svg
                  className="w-7 h-7 text-primary-foreground relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="font-black text-xl text-foreground tracking-tight text-display">EOZ ESPORT</h1>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex justify-center">
              <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl hover:scale-110 transition-transform border border-primary/30">
                <svg
                  className="w-7 h-7 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 md:px-4 py-3 md:py-3.5 rounded-xl transition-all font-bold text-xs sm:text-sm ${
                currentView === item.id
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02] border border-primary/30"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-[1.01]"
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              {item.badge && item.badge > 0 && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs h-5 min-w-[20px] px-1.5 animate-pulse">
                  {item.badge}
                </Badge>
              )}
              {(item as any).adminOnly && (
                <Badge className="ml-auto bg-accent text-accent-foreground text-xs h-5 px-2 font-bold">ADMIN</Badge>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Button - Desktop only */}
        <div className="hidden md:block p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full hover:bg-secondary"
          >
            <svg
              className={`w-5 h-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </Button>
        </div>

        <div className="p-4 border-t border-border bg-secondary/30">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary/40 hover:border-primary transition-colors ring-2 ring-primary/20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-black text-sm">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-foreground truncate">{user.username}</p>
                  {user.isAdmin && (
                    <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0 h-4 font-bold">
                      ADMIN
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                  <p className="text-xs text-muted-foreground font-semibold">En ligne</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex justify-center">
              <Avatar className="h-12 w-12 border-2 border-primary/40 hover:border-primary transition-colors hover:scale-110 ring-2 ring-primary/20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-black">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto scrollbar-thin">{renderContent()}</main>
    </div>
  )
}

function DashboardHome({ user }: { user: any }) {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      <div className="space-y-3">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance tracking-tight">
          Bienvenue, <span className="text-primary">{user.username}</span>
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl font-medium">
          Dashboard EOZ Esport - Plateforme professionnelle de gestion esport
        </p>
      </div>

      <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">Connectez vos statistiques Fortnite</h3>
            <p className="text-muted-foreground mb-4">
              Pour afficher vos statistiques en temps réel, utilisez le tracker dans le menu de navigation. Vos données
              seront récupérées directement depuis l'API Fortnite officielle.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Données en temps réel
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                API Officielle
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Historique complet
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Accès Rapide
          </h3>
          <div className="space-y-3">
            <button className="w-full p-4 text-left bg-secondary/50 hover:bg-secondary rounded-xl transition-all hover:scale-[1.02] border border-border hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Stats Tracker</p>
                  <p className="text-sm text-muted-foreground">Suivez vos performances en temps réel</p>
                </div>
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button className="w-full p-4 text-left bg-secondary/50 hover:bg-secondary rounded-xl transition-all hover:scale-[1.02] border border-border hover:border-accent/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Support</p>
                  <p className="text-sm text-muted-foreground">Ouvrir un ticket de support</p>
                </div>
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button className="w-full p-4 text-left bg-secondary/50 hover:bg-secondary rounded-xl transition-all hover:scale-[1.02] border border-border hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Actualités Fortnite</p>
                  <p className="text-sm text-muted-foreground">Dernières news et mises à jour</p>
                </div>
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activité récente
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <div className="p-2 rounded-lg bg-primary/20 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Connexion réussie</p>
                <p className="text-xs text-muted-foreground">Vous êtes maintenant connecté via Discord</p>
                <p className="text-xs text-muted-foreground mt-1">Maintenant</p>
              </div>
            </div>

            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                Votre activité apparaîtra ici au fur et à mesure de votre utilisation de la plateforme
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-accent/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent/20">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">Plateforme professionnelle EOZ Esport</h3>
            <p className="text-muted-foreground">
              Gérez vos statistiques Fortnite, communiquez avec votre équipe, suivez vos performances et accédez au
              support technique - tout depuis une seule plateforme sécurisée et moderne.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
