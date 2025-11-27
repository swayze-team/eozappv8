// Discord OAuth Configuration
export const DISCORD_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "",
  redirectUri: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
  scopes: ["identify", "email", "guilds"],
}

// Fortnite API Configuration
export const FORTNITE_CONFIG = {
  apiKey: process.env.FORTNITE_API_KEY || "",
  baseUrl: "https://fortnite-api.com/v2",
}

// App Configuration
export const APP_CONFIG = {
  name: "EOZ ESPORT",
  version: "1.0.0",
  build: "2024.11.26",
  description: "Professional Team Management Platform",
}

// Team Members
export const TEAM_MEMBERS = [
  { id: 1, name: "EOZ_Alpha", role: "Fragger", avatar: "🎯", status: "online" },
  { id: 2, name: "EOZ_Beta", role: "Support", avatar: "⚡", status: "online" },
  { id: 3, name: "EOZ_Gamma", role: "Builder", avatar: "🔥", status: "online" },
  { id: 4, name: "EOZ_Delta", role: "IGL", avatar: "💫", status: "away" },
]
