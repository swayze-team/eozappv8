"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export function FortniteNews() {
  const [news, setNews] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/fortnite/news")
      const data = await response.json()
      if (response.ok) {
        setNews(data.data)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Chargement des actualités...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 custom-scrollbar">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Actualités Fortnite</h2>
        <p className="text-muted-foreground text-lg">Restez informé des dernières nouveautés du jeu</p>
      </div>

      {news?.br && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {news.br.motds?.map((item: any, index: number) => (
            <Card key={index} className="overflow-hidden hover:scale-[1.02] transition-all group">
              <div className="relative h-64">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 text-balance">{item.title}</h3>
                  <p className="text-gray-200 text-sm text-pretty">{item.body}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
