import { type NextRequest, NextResponse } from "next/server"

const getStore = () => (global as any).ticketsStore || new Map<string, any[]>()

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { ticket } = await request.json()
    const ticketsStore = getStore()

    for (const [token, tickets] of ticketsStore.entries()) {
      const index = tickets.findIndex((t: any) => t.id === params.id)
      if (index !== -1) {
        tickets[index] = ticket
        ticketsStore.set(token, tickets)
        console.log("[v0] Ticket updated:", params.id)
        return NextResponse.json({ success: true, ticket })
      }
    }

    return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
  } catch (error) {
    console.error("[v0] Error updating ticket:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
