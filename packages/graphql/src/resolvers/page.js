import { existsSync as exists } from 'fs'
import { join } from 'path'
import generateNodeData from '../generateNodeData.js'
import config from '@josef/options'

export async function page(parent, args, ctx, info) {
  const { slug } = args || {}
  if (!slug) throw new Error('Invalid slug supplied')

  let nodeFile
  let namedFile = join(config.content, `${slug}.md`)
  let namedDir = join(config.content, `${slug}/index.md`)
  if (exists(namedFile)) {
    nodeFile = namedFile
  }
  if (exists(namedDir)) {
    nodeFile = namedDir
  }
  return await generateNodeData(nodeFile, args.options)
}
