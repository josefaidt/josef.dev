import type { PlaybackState, AccessToken } from "@spotify/web-api-ts-sdk"
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} from "astro:env/server"

async function getSpotifyToken(): Promise<AccessToken> {
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
  return response.json()
}

export async function fetchSpotifyCurrentlyPlaying(): Promise<PlaybackState | null> {
  const { access_token: token } = await getSpotifyToken()
  const url = new URL(
    "/v1/me/player/currently-playing",
    "https://api.spotify.com",
  )
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  })

  const request = new Request(url, { headers })
  const response = await fetch(request)

  // Handle 204 No Content when nothing is playing
  if (response.status === 204) {
    return null
  }

  return response.json()
}
