import { process } from '@josef/markdown'

export async function get({ params }) {
  const { slug } = params

  const { metadata, content } = await process(`content/posts/${slug}.md`)
  const body = JSON.stringify({ metadata, content })

  return {
    body,
  }
}
