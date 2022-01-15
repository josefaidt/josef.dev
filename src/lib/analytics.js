import fetch from 'node-fetch'
import { writable, get } from 'svelte/store'

export const store = writable({})

const SITE_ID = process.env['PANELBEAR_SITE_ID']
const API_KEY = process.env['PANELBEAR_API_KEY']
const API_URL = 'https://api.panelbear.com/v1'
const API_URL_STATS = `${API_URL}/stats/breakdown`

const params = {
  site_id: SITE_ID,
  aggregate: ['session_count', 'event_count'],
  group_by: 'path',
  period: '24m',
  page_size: 100,
}

/**
 *
 * @param {object} options
 * @param {string} [options.period="24m"]
 * @returns
 */
export async function listPageViews(options = {}) {
  // return stored value, mitigates status 429 TOO MANY REQUESTS in dev
  if (get(store).pageViews) return get(store).pageViews
  const response = await fetch(API_URL_STATS, {
    method: 'POST',
    // cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      // 'Cache-Control': 'max-age=86400', // 24 hours
      'Cache-Control': 'max-age=604800', // 7 days
    },
    body: JSON.stringify(params),
  })
  if (response.status !== 200) {
    throw await response.json()
  }
  const { data } = await response.json()
  store.update(state => ({ ...state, pageViews: data }))
  return data
}
