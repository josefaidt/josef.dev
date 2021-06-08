import { readdir } from 'fs/promises'
import { join } from 'path'
import generateNodeData from '../generateNodeData'
import config from '../options'

export async function allPosts(parent, args, ctx, info) {
  // prep result based on supplied sort
  const postPath = join(config.content, 'posts')
  const files = (await readdir(postPath))
    .filter(fileName => /.+\.md$/.test(fileName))
    .map(fileName => generateNodeData(join(postPath, fileName), args.options))

  let result = []
  for await (let file of files) {
    result.push(file)
  }
  const { sortBy, order } = args || {}

  const pre = prop => {
    if (sortBy.toLowerCase() === 'date') {
      return new Date(prop)
    }
    return prop
  }

  if (order.toLowerCase() === 'asc') {
    result.sort((a, b) =>
      pre(a.metadata[sortBy]) < pre(b.metadata[sortBy]) ? -1 : 1
    )
  }

  if (order.toLowerCase() === 'desc') {
    result.sort((a, b) =>
      pre(a.metadata[sortBy]) > pre(b.metadata[sortBy]) ? -1 : 1
    )
  }

  return result
}
