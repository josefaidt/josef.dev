import { listPosts, listDiscussionPosts } from '$lib/content.js'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(req) {
  let errors
  let posts
  let discussions

  try {
    posts = await listPosts()
  } catch (error) {
    errors = [error]
  }

  try {
    discussions = await listDiscussionPosts()
  } catch (error) {
    errors = [...errors, error]
  }

  let result = [...discussions]

  if (import.meta.env.PROD) {
    posts = posts.filter(post => post.published)
  }
  result.push.apply(result, posts)

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

  const body = JSON.stringify(result)

  return {
    body,
  }
}
