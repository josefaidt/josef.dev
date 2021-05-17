import { query } from '@josef/graphql'

export async function get({ path, ...rest }) {
  const { data, errors } = await query(
    `
    query GET_POST($slug: String!) {
      post(slug:$slug) {
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
    { slug: path.replace(/\.json$/, '') }
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
