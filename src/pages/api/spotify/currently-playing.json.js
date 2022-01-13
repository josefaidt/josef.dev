import { getNowPlaying } from './_'

/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(req) {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return {
      body: {
        isPlaying: false,
      },
    }
  }

  const song = await response.json()
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map(_artist => _artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
    body: {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    },
  }
}
