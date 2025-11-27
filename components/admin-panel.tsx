"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface AdminPanelProps {
  user: any
}

interface Ticket {
  id: string
  title: string
  description: string
  category: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  createdAt: string
  updatedAt: string
  messages: any[]
  userToken: string
}

interface SiteSettings {
  siteName: string
  description: string
  maintenanceMode: boolean
  welcomeMessage: string
  discordInvite: string
  twitterHandle: string
  youtubeChannel: string
}

export function AdminPanel({ user }: AdminPanelProps) {
  const [allTickets, setAllTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [adminMessage, setAdminMessage] = useState("")
  const [filter, setFilter] = useState<"all" | "open" | "in-progress" | "resolved" | "closed">("all")
  const { toast } = useToast()

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: "EOZ ESPORT",
    description: "Plateforme professionnelle de gestion esport",
    maintenanceMode: false,
    welcomeMessage: "Bienvenue sur la plateforme EOZ Esport",
    discordInvite: "https://discord.gg/eozesport",
    twitterHandle: "@eozesport",
    youtubeChannel: "EOZ Esport",
  })

  useEffect(() => {
    loadAllTickets()
    loadSiteSettings()
  }, [])

  const loadSiteSettings = () => {
    const savedSettings = localStorage.getItem("eoz_site_settings")
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings))
    }
  }

  const saveSiteSettings = () => {
    localStorage.setItem("eoz_site_settings", JSON.stringify(siteSettings))
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres du site ont été mis à jour avec succès",
    })
  }

  const loadAllTickets = async () => {
    try {
      const response = await fetch("/api/tickets/admin")
      if (response.ok) {
        const data = await response.json()
        setAllTickets(data.tickets || [])
      }
    } catch (error) {
      console.error("[v0] Error loading admin tickets:", error)
    }
  }

  const updateTicketStatus = async (ticketId: string, newStatus: Ticket["status"]) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setAllTickets(allTickets.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t)))
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket({ ...selectedTicket, status: newStatus })
        }
        toast({
          title: "Statut mis à jour",
          description: `Le ticket a été marqué comme ${newStatus}`,
        })
      }
    } catch (error) {
      console.error("[v0] Error updating ticket status:", error)
    }
  }

  const sendAdminMessage = async () => {
    if (!adminMessage.trim() || !selectedTicket) return

    const message = {
      id: `msg_${Date.now()}`,
      author: user.username,
      isAdmin: true,
      content: adminMessage,
      timestamp: new Date().toISOString(),
    }

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, message],
      updatedAt: new Date().toISOString(),
      status: "in-progress" as const,
    }

    try {
      const response = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket: updatedTicket }),
      })

      if (response.ok) {
        setSelectedTicket(updatedTicket)
        setAllTickets(allTickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)))
        setAdminMessage("")
        toast({
          title: "Message envoyé",
          description: "Votre réponse a été envoyée à l'utilisateur",
        })
      }
    } catch (error) {
      console.error("[v0] Error sending admin message:", error)
    }
  }

  const filteredTickets = allTickets.filter((t) => filter === "all" || t.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Admin Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-sm px-4 py-1.5 font-bold tracking-wide border border-accent/30">
            ADMIN PANEL
          </Badge>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight text-display">
          Administration
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium">
          Gérez votre plateforme EOZ Esport
        </p>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-2 max-w-md">
          <TabsTrigger value="tickets">Tickets Support</TabsTrigger>
          <TabsTrigger value="settings">Paramètres Site</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "Tous", count: allTickets.length },
              { value: "open", label: "Ouverts", count: allTickets.filter((t) => t.status === "open").length },
              {
                value: "in-progress",
                label: "En cours",
                count: allTickets.filter((t) => t.status === "in-progress").length,
              },
              { value: "resolved", label: "Résolus", count: allTickets.filter((t) => t.status === "resolved").length },
              { value: "closed", label: "Fermés", count: allTickets.filter((t) => t.status === "closed").length },
            ].map((tab) => (
              <Button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                variant={filter === tab.value ? "default" : "outline"}
                className={`${
                  filter === tab.value
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/50 text-foreground hover:bg-secondary"
                } transition-all hover:scale-105`}
              >
                {tab.label}
                <Badge className="ml-2 bg-background/20 text-inherit border-0">{tab.count}</Badge>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Tickets List */}
            <Card className="p-4 md:p-6 flex flex-col max-h-[600px]">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
                Tickets ({filteredTickets.length})
              </h3>

              <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin">
                {filteredTickets.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <p className="text-muted-foreground font-medium">Aucun ticket</p>
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <Card
                      key={ticket.id}
                      className={`p-3 md:p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                        selectedTicket?.id === ticket.id
                          ? "border-accent bg-accent/5 shadow-lg"
                          : "hover:bg-secondary/50"
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-foreground text-sm line-clamp-1">{ticket.title}</h4>
                          <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{ticket.description}</p>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <Badge className={getStatusColor(ticket.status)} variant="outline">
                            {ticket.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(ticket.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                        {ticket.messages.length > 0 && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            {ticket.messages.length} message(s)
                          </div>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>

            {/* Ticket Details */}
            <Card className="lg:col-span-2 p-4 md:p-6 flex flex-col overflow-hidden">
              {selectedTicket ? (
                <>
                  <div className="border-b border-border pb-4 md:pb-6 mb-4 md:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{selectedTicket.title}</h3>
                        <p className="text-muted-foreground text-sm">{selectedTicket.description}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Select
                          value={selectedTicket.status}
                          onValueChange={(v: any) => updateTicketStatus(selectedTicket.id, v)}
                        >
                          <SelectTrigger className="w-full sm:w-[160px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Ouvert</SelectItem>
                            <SelectItem value="in-progress">En cours</SelectItem>
                            <SelectItem value="resolved">Résolu</SelectItem>
                            <SelectItem value="closed">Fermé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Catégorie:</span>
                        <Badge variant="outline">{selectedTicket.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Priorité:</span>
                        <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Créé:</span>
                        <span className="text-foreground font-medium">
                          {new Date(selectedTicket.createdAt).toLocaleString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin mb-4 md:mb-6">
                    {selectedTicket.messages.length === 0 ? (
                      <div className="text-center py-8 md:py-12">
                        <p className="text-muted-foreground font-medium">Aucun message</p>
                      </div>
                    ) : (
                      selectedTicket.messages.map((msg: any) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.isAdmin ? "" : "flex-row-reverse"}`}>
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                              msg.isAdmin ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {msg.author.substring(0, 2).toUpperCase()}
                          </div>
                          <div className={`flex-1 max-w-[80%] ${msg.isAdmin ? "" : "items-end flex flex-col"}`}>
                            <div className={`flex items-center gap-2 mb-1 ${msg.isAdmin ? "" : "flex-row-reverse"}`}>
                              <span className="font-bold text-sm text-foreground">{msg.author}</span>
                              {msg.isAdmin && <Badge className="bg-accent text-accent-foreground text-xs">Admin</Badge>}
                              <span className="text-xs text-muted-foreground">
                                {new Date(msg.timestamp).toLocaleTimeString("fr-FR")}
                              </span>
                            </div>
                            <div
                              className={`${
                                msg.isAdmin
                                  ? "bg-accent/10 text-foreground border border-accent/30 rounded-tl-none"
                                  : "bg-primary text-primary-foreground rounded-tr-none"
                              } p-3 md:p-4 rounded-xl shadow-sm`}
                            >
                              <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Admin Message Input */}
                  <div className="border-t border-border pt-4 md:pt-6">
                    <Textarea
                      placeholder="Répondre au ticket..."
                      value={adminMessage}
                      onChange={(e) => setAdminMessage(e.target.value)}
                      className="mb-3 min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={sendAdminMessage}
                        disabled={!adminMessage.trim()}
                        className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Envoyer la réponse
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 md:w-20 h-16 md:h-20 mx-auto text-muted-foreground mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Sélectionnez un ticket</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Choisissez un ticket pour voir les détails et répondre
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Paramètres de la plateforme</h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nom du site</Label>
                <Input
                  id="siteName"
                  value={siteSettings.siteName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                  placeholder="EOZ ESPORT"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={siteSettings.description}
                  onChange={(e) => setSiteSettings({ ...siteSettings, description: e.target.value })}
                  placeholder="Description de votre plateforme"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Message de bienvenue</Label>
                <Textarea
                  id="welcomeMessage"
                  value={siteSettings.welcomeMessage}
                  onChange={(e) => setSiteSettings({ ...siteSettings, welcomeMessage: e.target.value })}
                  placeholder="Message affiché sur le dashboard"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discordInvite">Lien Discord</Label>
                  <Input
                    id="discordInvite"
                    value={siteSettings.discordInvite}
                    onChange={(e) => setSiteSettings({ ...siteSettings, discordInvite: e.target.value })}
                    placeholder="https://discord.gg/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterHandle">Twitter/X</Label>
                  <Input
                    id="twitterHandle"
                    value={siteSettings.twitterHandle}
                    onChange={(e) => setSiteSettings({ ...siteSettings, twitterHandle: e.target.value })}
                    placeholder="@votre_handle"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeChannel">Chaîne YouTube</Label>
                <Input
                  id="youtubeChannel"
                  value={siteSettings.youtubeChannel}
                  onChange={(e) => setSiteSettings({ ...siteSettings, youtubeChannel: e.target.value })}
                  placeholder="Nom de votre chaîne"
                />
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={siteSettings.maintenanceMode}
                  onChange={(e) => setSiteSettings({ ...siteSettings, maintenanceMode: e.target.checked })}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <Label htmlFor="maintenanceMode" className="font-bold">
                    Mode maintenance
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Activer le mode maintenance empêche les utilisateurs d'accéder à la plateforme
                  </p>
                </div>
              </div>

              <Button onClick={saveSiteSettings} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Sauvegarder les paramètres
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Informations
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Les paramètres sont sauvegardés localement dans le navigateur
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Le mode maintenance n'affecte pas les administrateurs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Les modifications sont visibles immédiatement après sauvegarde
              </li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
