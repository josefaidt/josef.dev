import { listPosts } from '$lib/content.js'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(req) {
  let errors
  let posts
  try {
    posts = await listPosts()
  } catch (error) {
    errors = [error]
  }

  if (import.meta.env.PROD) {
    posts = posts.filter(post => post.published)
  }

  if (errors) {
    console.log({ errors })
    return {
      status: 400,
      body: JSON.stringify(errors),
    }
  }

  if (!posts) {
    return {
      status: 500,
      body: 'Unable to list posts',
    }
  }

  const body = JSON.stringify(posts)

  return {
    body,
  }
}
