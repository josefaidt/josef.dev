import type { APIRoute } from "astro"
import { SPOTIFY_CLIENT_ID } from "astro:env/server"

const isDev = import.meta.env.DEV
const redirectUri = "http://localhost:4321/api/auth/callback"
const clientId = SPOTIFY_CLIENT_ID

export const GET: APIRoute = async () => {
  if (!isDev) {
    return new Response("Not available in production", { status: 403 })
  }

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "user-read-currently-playing",
    show_dialog: "true",
  })

  return Response.redirect(`https://accounts.spotify.com/authorize?${params}`)
}
