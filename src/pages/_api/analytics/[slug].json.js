import { getViewsFromSlug } from './_csv'

/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get({ params }) {
  const views = getViewsFromSlug(params.slug)
  if (!views) {
    return {
      status: 404,
    }
  }
  return {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
    body: {
      views,
    },
  }
}
