import type { APIRoute } from "astro"
import { fetchSpotifyCurrentlyPlaying } from "../../../lib/spotify"

export const GET: APIRoute = async () => {
  try {
    const currentlyPlaying = await fetchSpotifyCurrentlyPlaying()

    return new Response(JSON.stringify(currentlyPlaying), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Prevent caching of dynamic content
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Spotify API error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to fetch Spotify data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )
  }
}
