import { query } from '@josef/graphql'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ path, ...rest }) {
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
          keywords
        }
        html
      }
    }
  `,
    {
      slug: path.replace(/\.json$/, ''),
      toLocaleDateStringOptions: {
        year: 'numeric',
        month: 'short',
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
