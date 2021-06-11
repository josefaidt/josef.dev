import { query } from '@josef/graphql'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ path }) {
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
        }
        html
      }
    }
  `,
    {
      slug: path.replace(/\.json$/, ''),
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

  const body = JSON.stringify(data.post)

  return {
    body,
  }
}
