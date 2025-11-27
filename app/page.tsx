"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] App initialized, checking authentication")

    const urlParams = new URLSearchParams(window.location.search)
    const authStatus = urlParams.get("auth")
    const error = urlParams.get("error")

    if (error) {
      console.error("[v0] Authentication error:", error)
      alert(`Erreur d'authentification: ${error}. Veuillez réessayer.`)
      window.history.replaceState({}, document.title, "/")
      setLoading(false)
      return
    }

    if (authStatus === "success") {
      console.log("[v0] Authentication successful, checking cookie")

      const cookies = document.cookie.split(";")
      const userCookie = cookies.find((c) => c.trim().startsWith("discord_user="))

      if (userCookie) {
        try {
          const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]))
          console.log("[v0] User data from cookie:", userData.username, "Admin:", userData.isAdmin)
          setUser(userData)
          localStorage.setItem("eoz_user", JSON.stringify(userData))
        } catch (e) {
          console.error("[v0] Failed to parse user cookie:", e)
        }
      }

      // Clean URL
      window.history.replaceState({}, document.title, "/")
    } else {
      const storedUser = localStorage.getItem("eoz_user")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          console.log("[v0] Restored user from localStorage:", userData.username)
          setUser(userData)
        } catch (e) {
          console.error("[v0] Failed to parse stored user:", e)
          localStorage.removeItem("eoz_user")
        }
      }
    }

    setLoading(false)
  }, [])

  const handleLogout = () => {
    console.log("[v0] User logging out")
    setUser(null)
    localStorage.removeItem("eoz_user")
    document.cookie = "discord_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-primary opacity-20"></div>
            <div className="absolute inset-0 blur-xl rounded-full h-20 w-20 bg-primary opacity-30 animate-pulse"></div>
          </div>
          <p className="text-foreground font-bold text-xl tracking-wide animate-pulse">Connexion en cours...</p>
        </div>
      </div>
    )
  }

  return user ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginPage />
}
