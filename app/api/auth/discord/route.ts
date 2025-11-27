import { NextResponse } from "next/server"

const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "YOUR_DISCORD_CLIENT_ID"
const REDIRECT_URI =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/auth/discord/callback`
    : process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || "http://localhost:3000"

export async function GET() {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email%20guilds`

  return NextResponse.redirect(discordAuthUrl)
}
