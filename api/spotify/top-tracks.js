const { getTopTracks } = require('./_')

module.exports = async function (req, res) {
  const response = await getTopTracks()
  const { items } = await response.json()

  const tracks = items.slice(0, 10).map(track => ({
    artist: track.artists.map(_artist => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }))

  if (process.env.VERCEL)
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  return res.status(200).json({ tracks })
}
