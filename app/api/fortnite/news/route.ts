import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://fortnite-api.com/v2/news/br", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Fortnite News API error:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
