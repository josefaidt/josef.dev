import { process } from '@josef/markdown'
import { query } from '@josef/graphql'

export async function get({ params }) {
  const { slug } = params

  const { metadata, content } = await process(`content/posts/${slug}.md`)
  const body = JSON.stringify({ metadata, content })

  return {
    body,
  }
}
