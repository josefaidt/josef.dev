import { getPage } from '$lib/content'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url, ...rest }) {
  let errors
  let page
  try {
    page = await getPage(url.pathname.replace(/\.json$/, ''))
  } catch (error) {
    errors = [error]
  }

  if (errors) {
    return {
      status: 400,
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

  const body = JSON.stringify(page)

  return {
    body,
  }
}
