import type { PlaybackState, AccessToken } from "@spotify/web-api-ts-sdk"
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from "astro:env/server"

// Access tokens last an hour, and a Worker isolate serves many requests, so the token is kept in
// module scope and reused until a minute before it expires.
let cachedToken: { value: string; expiresAt: number } | null = null

async function getSpotifyToken(): Promise<string | null> {
  if (cachedToken !== null && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value
  }

  const url = new URL("https://accounts.spotify.com/api/token")
  const headers = new Headers({
    Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  })

  const params = new URLSearchParams()
  params.append("grant_type", "refresh_token")
  params.append("refresh_token", SPOTIFY_REFRESH_TOKEN)

  const request = new Request(url, {
    method: "POST",
    headers,
    body: params,
  })

  const response = await fetch(request)
  if (!response.ok) {
    return null
  }

  const token: AccessToken = await response.json()
  cachedToken = {
    value: token.access_token,
    expiresAt: Date.now() + (token.expires_in - 60) * 1000,
  }
  return token.access_token
}

function requestCurrentlyPlaying(token: string): Promise<Response> {
  const url = new URL("/v1/me/player/currently-playing", "https://api.spotify.com")
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  })

  return fetch(new Request(url, { headers }))
}

export async function fetchSpotifyCurrentlyPlaying(): Promise<PlaybackState | null> {
  let token = await getSpotifyToken()
  if (token === null) {
    return null
  }

  let response = await requestCurrentlyPlaying(token)

  // A reused token can stop working before it expires, if it is revoked. Get a new one and retry once.
  if (response.status === 401) {
    cachedToken = null
    token = await getSpotifyToken()
    if (token === null) {
      return null
    }
    response = await requestCurrentlyPlaying(token)
  }

  // Handle 204 No Content when nothing is playing
  if (response.status === 204) {
    return null
  }

  return response.json()
}
