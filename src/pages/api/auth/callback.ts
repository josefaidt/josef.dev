import type { APIRoute } from "astro"
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "astro:env/server"

const isDev = import.meta.env.DEV
const clientId = SPOTIFY_CLIENT_ID
const clientSecret = SPOTIFY_CLIENT_SECRET

export const GET: APIRoute = async ({ request }) => {
  if (!isDev) {
    return new Response("Not available in production", { status: 403 })
  }

  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  if (!code) {
    return new Response("No code provided", { status: 400 })
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:4321/api/auth/callback",
    }),
  })

  const data = await response.json()

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
  })
}
