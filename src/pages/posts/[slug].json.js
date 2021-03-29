import { useGraphQL } from '$hooks'

/**
 * @param {import('@sveltejs/kit').Request} request
 * @param {any} context
 * @returns {import('@sveltejs/kit').Response}
 */
export async function get(req) {
  const postQuery = `
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
  const { data, errors } = await useGraphQL(postQuery, { slug: `/posts/${slug}` })
  const { post } = data || {}

  if (post) {
    return {
      body: {
        post,
      },
    }
  }
}
