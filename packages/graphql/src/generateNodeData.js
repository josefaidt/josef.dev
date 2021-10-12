import { basename, extname, dirname } from 'path'
import { process } from '@josef/markdown'
import config from '@josef/options'

const indexRegex = /index\.(svx|md)$/
export default async function generateNodeData(postPath, options) {
  const { toLocaleDateStringOptions } = options || {}
  // This will give you a valid svelte component
  const { metadata, content: html } = await process(postPath)
  let slug = postPath.replace(config.content, '')

  // if /index, remove that nonsense
  if (indexRegex.test(slug)) slug = slug.replace(indexRegex, '')
  // remove extension
  slug = slug.replace(extname(postPath), '')

  // add formatted JS date
  if (metadata.date)
    metadata.date = new Date(`${metadata.date}`).toLocaleDateString(
      undefined,
      toLocaleDateStringOptions
    )
  // provide empty description
  if (!metadata.description) metadata.description = ''
  // provide empty keywords
  if (!metadata.keywords) metadata.keywords = []

  // content zone (i.e. /content/posts -> "posts")
  const zone = basename(dirname(postPath))

  return {
    absolutePath: postPath,
    ext: extname(postPath).replace(/^\./g, ''),
    metadata,
    html,
    name: basename(postPath).replace(extname(postPath), ''),
    slug,
    zone,
  }
}
