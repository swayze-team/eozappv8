import { type NextRequest, NextResponse } from "next/server"

const FORTNITE_API_KEY = process.env.FORTNITE_API_KEY || ""

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")
  const accountType = searchParams.get("accountType") || "epic"

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Using Fortnite-API.com (free tier available)
    const response = await fetch(
      `https://fortnite-api.com/v2/stats/br/v2?name=${encodeURIComponent(username)}&accountType=${accountType}`,
      {
        headers: {
          Authorization: FORTNITE_API_KEY,
        },
      },
    )

    if (!response.ok) {
      return NextResponse.json({ error: "Player not found or API error" }, { status: 404 })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Fortnite API error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
