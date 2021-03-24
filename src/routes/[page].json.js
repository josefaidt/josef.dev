import fetch from 'node-fetch'

/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(req, { api }) {
  const pageQuery = `
    query PAGE($slug: String!) {
      page(slug: $slug) {
        _id
        slug
        frontmatter {
          title
          date
          published
          tags
        }
        html
      }
    }
    `
  const { page: slug } = req.params

  const res = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: pageQuery,
      variables: { slug: `/${slug}` },
    }),
  })
  const { data, errors } = await res.json()
  const { page } = data || {}

  if (page) {
    return {
      body: {
        page,
      },
    }
  }
}
