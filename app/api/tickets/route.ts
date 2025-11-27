import { type NextRequest, NextResponse } from "next/server"

if (typeof global !== "undefined" && !(global as any).ticketsStore) {
  ;(global as any).ticketsStore = new Map<string, any[]>()
}

const getStore = () => (global as any).ticketsStore || new Map<string, any[]>()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 })
  }

  const ticketsStore = getStore()
  const userTickets = ticketsStore.get(token) || []

  console.log("[v0] User", token.substring(0, 20), "has", userTickets.length, "tickets")

  return NextResponse.json({ tickets: userTickets })
}

export async function POST(request: NextRequest) {
  try {
    const { ticket, userToken } = await request.json()

    if (!userToken || !ticket) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const ticketsStore = getStore()
    const userTickets = ticketsStore.get(userToken) || []
    userTickets.push(ticket)
    ticketsStore.set(userToken, userTickets)

    console.log("[v0] New ticket created:", ticket.id, "for user", userToken.substring(0, 20))

    return NextResponse.json({ success: true, ticket })
  } catch (error) {
    console.error("[v0] Error creating ticket:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
