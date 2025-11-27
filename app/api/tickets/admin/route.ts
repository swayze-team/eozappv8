import { type NextRequest, NextResponse } from "next/server"

const getStore = () => (global as any).ticketsStore || new Map<string, any[]>()

export async function GET(request: NextRequest) {
  console.log("[v0] Admin fetching all tickets")

  const allTickets: any[] = []
  const ticketsStore = getStore()

  // Collect all tickets from all users
  for (const [userToken, tickets] of ticketsStore.entries()) {
    allTickets.push(
      ...tickets.map((ticket: any) => ({
        ...ticket,
        userToken,
      })),
    )
  }

  // Sort by most recent first
  allTickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  console.log("[v0] Admin found", allTickets.length, "total tickets")

  return NextResponse.json({ tickets: allTickets })
}
