import { useGraphQL } from '$hooks'

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
  const { data, errors } = await useGraphQL(pageQuery, { slug: `/${slug}` })
  const { page } = data || {}

  if (page) {
    return {
      body: {
        page,
      },
    }
  }
}
