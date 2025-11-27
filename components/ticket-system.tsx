"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface TicketSystemProps {
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
  messages: TicketMessage[]
}

interface TicketMessage {
  id: string
  author: string
  isAdmin: boolean
  content: string
  timestamp: string
}

export function TicketSystem({ user }: TicketSystemProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const { toast } = useToast()

  // Form states
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("technical")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium")

  // Get or create user token
  useEffect(() => {
    let userToken = localStorage.getItem("eoz_user_token")
    if (!userToken) {
      userToken = `eoz_${Date.now()}_${Math.random().toString(36).substring(7)}`
      localStorage.setItem("eoz_user_token", userToken)
    }
    loadTickets(userToken)
  }, [])

  const loadTickets = async (token: string) => {
    try {
      const response = await fetch(`/api/tickets?token=${token}`)
      if (response.ok) {
        const data = await response.json()
        setTickets(data.tickets || [])
      }
    } catch (error) {
      console.error("[v0] Error loading tickets:", error)
    }
  }

  const createTicket = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    const userToken = localStorage.getItem("eoz_user_token")
    const newTicket: Ticket = {
      id: `ticket_${Date.now()}`,
      title,
      description,
      category,
      status: "open",
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    }

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket: newTicket, userToken }),
      })

      if (response.ok) {
        setTickets([newTicket, ...tickets])
        setTitle("")
        setDescription("")
        setCategory("technical")
        setPriority("medium")
        setShowCreateForm(false)
        toast({
          title: "Ticket créé",
          description: "Votre ticket a été créé avec succès. Un admin va le traiter sous peu.",
        })
      }
    } catch (error) {
      console.error("[v0] Error creating ticket:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer le ticket",
        variant: "destructive",
      })
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return

    const message: TicketMessage = {
      id: `msg_${Date.now()}`,
      author: user.username,
      isAdmin: false,
      content: newMessage,
      timestamp: new Date().toISOString(),
    }

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, message],
      updatedAt: new Date().toISOString(),
    }

    try {
      const response = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket: updatedTicket }),
      })

      if (response.ok) {
        setSelectedTicket(updatedTicket)
        setTickets(tickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)))
        setNewMessage("")

        // Simulate admin response after 2 seconds
        setTimeout(() => {
          const adminMessage: TicketMessage = {
            id: `msg_${Date.now()}`,
            author: "EOZ Support",
            isAdmin: true,
            content: "Merci pour votre message. Nous examinons votre demande et reviendrons vers vous rapidement.",
            timestamp: new Date().toISOString(),
          }
          const updatedWithAdmin = {
            ...updatedTicket,
            messages: [...updatedTicket.messages, adminMessage],
            status: "in-progress" as const,
          }
          setSelectedTicket(updatedWithAdmin)
          setTickets(tickets.map((t) => (t.id === updatedWithAdmin.id ? updatedWithAdmin : t)))
        }, 2000)
      }
    } catch (error) {
      console.error("[v0] Error sending message:", error)
    }
  }

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
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto h-screen flex flex-col">
      <div className="space-y-3">
        <h2 className="text-5xl font-bold text-foreground tracking-tight">Support & Tickets</h2>
        <p className="text-muted-foreground text-xl font-medium">
          Créez et gérez vos tickets de support avec l'équipe EOZ Esport
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Tickets List */}
        <Card className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Mes Tickets</h3>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-primary text-primary-foreground hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nouveau
            </Button>
          </div>

          {showCreateForm && (
            <Card className="p-4 mb-6 bg-secondary/50 border-primary/30">
              <h4 className="font-bold text-foreground mb-4">Créer un ticket</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Titre</label>
                  <Input
                    placeholder="Décrivez brièvement votre problème..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                  <Textarea
                    placeholder="Détaillez votre problème ou votre demande..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Catégorie</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technique</SelectItem>
                        <SelectItem value="account">Compte</SelectItem>
                        <SelectItem value="payment">Paiement</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Priorité</label>
                    <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={createTicket} className="flex-1 bg-primary text-primary-foreground">
                    Créer
                  </Button>
                  <Button onClick={() => setShowCreateForm(false)} variant="outline">
                    Annuler
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin">
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-muted-foreground mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-muted-foreground font-medium">Aucun ticket</p>
                <p className="text-sm text-muted-foreground mt-1">Créez votre premier ticket de support</p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={`p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedTicket?.id === ticket.id ? "border-primary bg-primary/5" : "hover:bg-secondary/50"
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
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(ticket.status)} variant="outline">
                        {ticket.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>

        {/* Ticket Details */}
        <Card className="lg:col-span-2 p-6 flex flex-col">
          {selectedTicket ? (
            <>
              <div className="border-b border-border pb-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{selectedTicket.title}</h3>
                    <p className="text-muted-foreground text-sm">{selectedTicket.description}</p>
                  </div>
                  <Badge className={getStatusColor(selectedTicket.status)} variant="outline">
                    {selectedTicket.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Catégorie:</span>
                    <Badge variant="outline">{selectedTicket.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Priorité:</span>
                    <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Créé le:</span>
                    <span className="text-foreground font-medium">
                      {new Date(selectedTicket.createdAt).toLocaleString("fr-FR")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin mb-6">
                {selectedTicket.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="w-12 h-12 mx-auto text-muted-foreground mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="text-muted-foreground font-medium">Aucun message</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Envoyez un message pour commencer la conversation
                    </p>
                  </div>
                ) : (
                  selectedTicket.messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isAdmin ? "" : "flex-row-reverse"}`}>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
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
                              ? "bg-secondary text-foreground rounded-tl-none"
                              : "bg-primary text-primary-foreground rounded-tr-none"
                          } p-4 rounded-xl shadow-sm`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="border-t border-border pt-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary text-primary-foreground hover:scale-105 transition-transform"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-20 h-20 mx-auto text-muted-foreground mb-4"
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
                <h3 className="text-xl font-bold text-foreground mb-2">Sélectionnez un ticket</h3>
                <p className="text-muted-foreground">Choisissez un ticket dans la liste pour voir les détails</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
