import { type NextRequest, NextResponse } from "next/server"

const getStore = () => (global as any).ticketsStore || new Map<string, any[]>()

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "Status required" }, { status: 400 })
    }

    const ticketsStore = getStore()

    // Find and update ticket status across all users
    for (const [token, tickets] of ticketsStore.entries()) {
      const index = tickets.findIndex((t: any) => t.id === params.id)
      if (index !== -1) {
        tickets[index].status = status
        tickets[index].updatedAt = new Date().toISOString()
        ticketsStore.set(token, tickets)
        console.log("[v0] Ticket status updated:", params.id, "->", status)
        return NextResponse.json({ success: true, ticket: tickets[index] })
      }
    }

    return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
  } catch (error) {
    console.error("[v0] Error updating ticket status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
