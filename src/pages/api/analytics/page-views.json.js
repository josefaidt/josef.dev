import { listPageViews } from '$lib/analytics'

/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get({ params }) {
  let errors = []
  let pageViews
  try {
    pageViews = await listPageViews()
  } catch (error) {
    errors.push(error.toString())
  }

  if (errors.length) {
    return {
      status: 500,
      body: { errors: JSON.stringify(errors) },
    }
  }

  if (!pageViews) {
    errors.push('No page views found')
    return {
      status: 500,
      body: JSON.stringify(errors),
    }
  }

  return {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
    body: pageViews,
  }
}
