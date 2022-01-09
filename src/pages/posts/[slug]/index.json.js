import { query } from '@josef/graphql'
import getShareImage from '@jlengstorf/get-share-image'
import { themes } from '$lib/theme'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url }) {
  const { data, errors } = await query(
    `
    query GET_POST($slug: String!, $toLocaleDateStringOptions: LocaleDateStringOptions) {
      post(
        slug:$slug, 
        options: { toLocaleDateStringOptions: $toLocaleDateStringOptions }
      ) {
        slug
        metadata {
          title
          description
          date
          tags
          readingTime {
            text
          }
        }
        html
      }
    }
  `,
    {
      slug: url.pathname.replace(/\.json$/, ''),
      toLocaleDateStringOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    }
  )

  if (errors) {
    return {
      status: 400,
      body: JSON.stringify(errors),
    }
  }

  const imageUrl = getShareImage({
    title: data.post.metadata.title,
    tagline: data.post.metadata.tags.map(k => `#${k}`).join('  '),
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    imagePublicID: import.meta.env.VITE_CLOUDINARY_IMAGE_PUBLIC_ID,
    textColor: themes.light.colors.text.slice(1),
  })

  if (imageUrl) {
    data.post.metadata.imageUrl = imageUrl
  }

  const body = JSON.stringify(data.post)

  return {
    body,
  }
}
