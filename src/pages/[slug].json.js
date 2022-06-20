import { getPage } from '$lib/content'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url }) {
  let errors = []
  let page
  try {
    page = await getPage(url.pathname.replace(/\.json$/, ''))
  } catch (error) {
    errors.push(error)
  }

  if (errors.length) {
    return {
      status: 500,
      body: JSON.stringify(errors),
    }
  }

  if (!page) {
    return {
      status: 404,
      body: JSON.stringify({
        errors: [
          {
            message: 'Page not found',
          },
        ],
      }),
    }
  }

  return {
    body: page,
  }
}
