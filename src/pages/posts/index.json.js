import { query } from '@josef/graphql'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(req) {
  const { data, errors } = await query(`
    query ALL_POSTS {
      allPosts {
        slug
        metadata {
          title
          description
        }
      }
    }
  `)

  if (errors) {
    return {
      status: 400,
      body: JSON.stringify(errors),
    }
  }

  if (!data) {
    return {
      status: 500,
    }
  }

  const body = JSON.stringify(data.allPosts)

  return {
    body,
  }
}
