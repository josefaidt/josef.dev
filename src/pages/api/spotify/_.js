import fetch from 'node-fetch'

const client_id = process.env['SPOTIFY_CLIENT_ID']
const client_secret = process.env['SPOTIFY_CLIENT_SECRET']
const refresh_token = process.env['SPOTIFY_TOKEN']

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

async function getAccessToken() {
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refresh_token)
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  return response.json()
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export async function getTopTracks() {
  const { access_token } = await getAccessToken()

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
