import getShareImage from '@jlengstorf/get-share-image'
import { themes } from '$lib/theme'
import { getPost } from '$lib/content'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url }) {
  let errors
  let post
  try {
    post = await getPost(url.pathname.replace(/\.json$/, ''))
  } catch (error) {
    errors = [error]
  }

  if (errors) {
    return {
      status: 400,
      body: JSON.stringify(errors),
    }
  }

  if (!post) {
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

  const imageUrl = getShareImage({
    title: post.metadata.title,
    tagline: post.metadata.tags?.map((k) => `#${k}`)?.join('  ') || '',
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    imagePublicID: import.meta.env.VITE_CLOUDINARY_IMAGE_PUBLIC_ID,
    textColor: themes.light.colors.text.slice(1),
  })

  if (imageUrl) {
    post.metadata.imageUrl = imageUrl
  }

  const body = JSON.stringify(post)

  return {
    body,
  }
}
