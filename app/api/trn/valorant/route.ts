import { type NextRequest, NextResponse } from "next/server"

const TRN_API_KEY = "957a7f66-6f03-4430-8a95-dafa93b26511"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")
  const tag = searchParams.get("tag")

  if (!username || !tag) {
    return NextResponse.json({ error: "Username and tag are required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://public-api.tracker.gg/v2/valorant/standard/profile/riot/${encodeURIComponent(username)}%23${encodeURIComponent(tag)}`,
      {
        headers: {
          "TRN-Api-Key": TRN_API_KEY,
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] TRN Valorant API error:", response.status, errorData)
      return NextResponse.json({ error: errorData.message || "Player not found" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] TRN Valorant API error:", error)
    return NextResponse.json({ error: "Failed to fetch Valorant stats" }, { status: 500 })
  }
}
