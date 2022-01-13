import { promises as fs } from 'fs'
import { join } from 'path'
import generateNodeData from '../generateNodeData.js'
import config from '@josef/options'
const { readdir } = fs

export async function allPages(parent, args, ctx, info) {
  const files = (await readdir(config.content))
    .filter(fileName => /.+\.md$/.test(fileName))
    .map(fileName =>
      generateNodeData(join(config.content, fileName), args.options)
    )

  let result = []
  for await (let file of files) {
    result.push(file)
  }
  // const { sortBy, order } = args || {}

  // const pre = prop => {
  //   if (sortBy.toLowerCase() === 'date') {
  //     return new Date(prop)
  //   }
  //   return prop
  // }

  // if (order.toLowerCase() === 'asc') {
  //   result.sort((a, b) =>
  //     pre(a.metadata[sortBy]) < pre(b.metadata[sortBy]) ? -1 : 1
  //   )
  // }

  // if (order.toLowerCase() === 'desc') {
  //   result.sort((a, b) =>
  //     pre(a.metadata[sortBy]) > pre(b.metadata[sortBy]) ? -1 : 1
  //   )
  // }

  return result
}
