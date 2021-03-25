import fetch from 'node-fetch'

/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(req, { api }) {
  const articleQuery = `
    query POST($slug: String!) {
      post(slug: $slug) {
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
  const { slug } = req.params

  const res = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: articleQuery,
      variables: { slug: `/blog/${slug}` },
    }),
  })
  const { data, errors } = await res.json()
  const { post } = data || {}

  if (post) {
    return {
      body: {
        post,
      },
    }
  }
}
