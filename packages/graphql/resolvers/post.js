import { join } from 'path'
import generateNodeData from '../generateNodeData'
import config from '../options'

export async function post(parent, args, ctx, info) {
  const { slug } = args || {}
  if (!slug) throw new Error('Invalid slug supplied')
  console.log(join(config.content, `${slug}.md`))
  return await generateNodeData(join(config.content, `${slug}.md`))
}
