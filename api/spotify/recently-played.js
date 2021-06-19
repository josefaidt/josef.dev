import { getRecentlyPlayed } from './_.js'

export default async function (req, res) {
  const response = await getRecentlyPlayed()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({})
  }

  const song = (await response.json()).items[0].track
  const title = song.name
  const artist = song.artists.map(_artist => _artist.name).join(', ')
  const album = song.album.name
  const albumImageUrl = song.album.images[0].url
  const songUrl = song.external_urls.spotify

  if (process.env.VERCEL)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30'
    )

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    songUrl,
    title,
  })
}
