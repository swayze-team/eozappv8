// API Helper Functions

export async function fetchFortniteStats(username: string, accountType = "epic") {
  try {
    const response = await fetch(
      `/api/fortnite/stats?username=${encodeURIComponent(username)}&accountType=${accountType}`,
    )
    if (!response.ok) {
      throw new Error("Failed to fetch stats")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching Fortnite stats:", error)
    throw error
  }
}

export async function fetchFortniteNews() {
  try {
    const response = await fetch("/api/fortnite/news")
    if (!response.ok) {
      throw new Error("Failed to fetch news")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching Fortnite news:", error)
    throw error
  }
}

export function getDiscordAuthUrl() {
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || ""
  const redirectUri = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
  return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email%20guilds`
}
