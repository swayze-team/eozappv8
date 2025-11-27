import { type NextRequest, NextResponse } from "next/server"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || ""
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || ""

const ADMIN_DISCORD_ID = "1013649086198587512"

export async function GET(request: NextRequest) {
  console.log("[v0] Discord callback initiated")

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    console.error("[v0] No authorization code provided")
    return NextResponse.redirect(new URL("/?error=no_code", request.url))
  }

  const protocol = request.headers.get("x-forwarded-proto") || "http"
  const host = request.headers.get("host") || "localhost:3000"
  const redirectUri = `${protocol}://${host}/api/auth/discord/callback`

  console.log("[v0] Using redirect URI:", redirectUri)
  console.log("[v0] Client ID:", DISCORD_CLIENT_ID ? "Configured" : "Missing")
  console.log("[v0] Client Secret:", DISCORD_CLIENT_SECRET ? "Configured" : "Missing")

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    })

    const tokenData = await tokenResponse.json()

    console.log("[v0] Token response status:", tokenResponse.status)

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("[v0] Failed to get access token:", tokenData)
      return NextResponse.redirect(new URL("/?error=token_failed", request.url))
    }

    console.log("[v0] Successfully obtained access token")

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    console.log("[v0] User data retrieved:", userData.username, userData.id)

    if (!userResponse.ok) {
      console.error("[v0] Failed to get user data:", userData)
      return NextResponse.redirect(new URL("/?error=user_failed", request.url))
    }

    const isAdmin = userData.id === ADMIN_DISCORD_ID
    const enrichedUserData = {
      ...userData,
      isAdmin,
      avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : null,
    }

    console.log("[v0] User authenticated successfully. Admin:", isAdmin)

    const homeUrl = new URL("/", request.url)
    homeUrl.searchParams.set("auth", "success")

    const response = NextResponse.redirect(homeUrl)

    response.cookies.set("discord_user", JSON.stringify(enrichedUserData), {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    })

    return response
  } catch (error) {
    console.error("[v0] Discord OAuth error:", error)
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url))
  }
}
