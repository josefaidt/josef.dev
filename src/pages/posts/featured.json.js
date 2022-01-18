import { listFeaturedPosts } from '$lib/content.js'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(req) {
  let errors
  let posts

  try {
    posts = await listFeaturedPosts()
  } catch (error) {
    errors = [error]
  }

  if (errors) {
    return {
      status: 400,
      body: JSON.stringify(errors.map((error) => error.toString())),
    }
  }

  if (!posts) {
    return {
      status: 500,
      body: 'Unable to list posts',
    }
  }

  posts = posts.map((post) => {
    if (!post.published) post.metadata.tags.unshift('NOT_PUBLISHED')
    return post
  })

  if (import.meta.env.PROD) {
    posts = posts.filter((post) => post.published)
  }

  return {
    body: posts,
  }
}
