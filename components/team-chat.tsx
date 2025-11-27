"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TeamChatProps {
  user: any
}

export function TeamChat({ user }: TeamChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "EOZ_Alpha",
      avatar: "🎯",
      message: "GG les gars, belle perf aujourd'hui! On a vraiment dominé en end game.",
      time: "14:32",
      isOwn: false,
    },
    {
      id: 2,
      user: "EOZ_Beta",
      avatar: "⚡",
      message: "On se connecte ce soir pour l'entraînement? Je veux travailler les rotations.",
      time: "14:35",
      isOwn: false,
    },
    {
      id: 3,
      user: "EOZ_Gamma",
      avatar: "🔥",
      message: "J'ai trouvé une nouvelle strat pour la rotation zone 4, je vous montre ça ce soir!",
      time: "14:38",
      isOwn: false,
    },
    {
      id: 4,
      user: "EOZ_Delta",
      avatar: "💫",
      message: "Perfect timing, j'ai analysé nos derniers matchs. On a besoin de travailler les mid-game fights.",
      time: "14:42",
      isOwn: false,
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: user.username,
        avatar: "👤",
        message: message,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate typing indicator and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const responses = [
          "Super idée! On teste ça ce soir 🎯",
          "J'arrive dans 5 minutes, je lance Fortnite 🎮",
          "GG pour cette stratégie! 🔥",
          "On va faire des scrims ensemble? ⚡",
        ]
        const randomResponse = {
          id: messages.length + 2,
          user: "EOZ_Alpha",
          avatar: "🎯",
          message: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
        }
        setMessages((prev) => [...prev, randomResponse])
      }, 2000)
    }
  }

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="space-y-2 mb-6">
        <h2 className="text-4xl font-bold text-foreground">Chat d'équipe</h2>
        <p className="text-muted-foreground text-lg">Communiquez avec vos coéquipiers en temps réel</p>
      </div>

      {/* Online Members */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">4 membres en ligne</span>
          </div>
          <div className="flex-1 flex items-center gap-2 justify-end">
            {["🎯", "⚡", "🔥", "💫"].map((emoji, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm hover:scale-110 transition-transform cursor-pointer"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-xl">
        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className={`${msg.isOwn ? "bg-accent" : "bg-primary"} text-primary-foreground text-xl`}>
                  {msg.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={`flex-1 max-w-[70%] ${msg.isOwn ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`flex items-center gap-2 mb-1 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                  <span className="font-semibold text-sm text-foreground">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <div
                  className={`${msg.isOwn ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"} p-3 rounded-lg ${msg.isOwn ? "rounded-tr-none" : "rounded-tl-none"} shadow-sm`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">🎯</AvatarFallback>
              </Avatar>
              <div className="bg-secondary p-3 rounded-lg rounded-tl-none">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-border bg-card">
          <div className="flex gap-3">
            <Input
              placeholder="Tapez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 h-12"
            />
            <Button
              onClick={handleSend}
              className="bg-primary text-primary-foreground h-12 px-6 hover:scale-[1.02] transition-transform font-semibold"
              disabled={!message.trim()}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Appuyez sur Entrée pour envoyer • Shift + Entrée pour nouvelle ligne
          </p>
        </div>
      </Card>
    </div>
  )
}
