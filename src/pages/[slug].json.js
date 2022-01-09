import { query } from '@josef/graphql'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url, ...rest }) {
  const { data, errors } = await query(
    `
    query GET_PAGE($slug: String!) {
      page(slug:$slug) {
        slug
        metadata {
          title
          description
          date
          keywords
        }
        html
      }
    }
  `,
    { slug: url.pathname.replace(/\.json$/, '') }
  )

  if (errors) {
    return {
      status: 400,
      body: JSON.stringify(errors),
    }
  }

  const body = JSON.stringify(data.page)

  return {
    body,
  }
}
