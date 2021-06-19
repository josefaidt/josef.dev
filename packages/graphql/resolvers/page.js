import { join } from 'path'
import generateNodeData from '../generateNodeData'
import config from '@josef/options'

export async function page(parent, args, ctx, info) {
  const { slug } = args || {}
  if (!slug) throw new Error('Invalid slug supplied')
  return await generateNodeData(
    join(config.content, `${slug}.md`),
    args.options
  )
}
