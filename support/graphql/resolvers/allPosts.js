const { promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const { v4: uuid } = require('uuid')
const recursiveReadDir = require('../../recursiveReadDir')

module.exports = async function queryAllPostsasync(args, ctx, info) {
  let result = []
  let postPath
  if (args.data.directory) {
    postPath = path.resolve(args.data.directory)
  } else {
    const base = process.cwd()
    // TODO: pluggable pages/posts based on routify config
    postPath = path.join(base, 'src/pages/blog')
  }
  const posts = await recursiveReadDir(postPath)
  for (let post of posts) {
    // This will give you a valid svelte component
    let { attributes: frontmatter } = fm(await fs.readFile(post, 'utf8'))
    let slug = post.replace(postPath, '/blog')
    if (slug.endsWith('/index.svx')) slug = slug.replace(/\/index\.svx$/g, '')
    else if (slug.endsWith('.svx')) slug = slug.replace('.svx', '')

    if (frontmatter.date) frontmatter.date = new Date(`${frontmatter.date}`).toString()
    // push prepped node data
    result.push({
      _id: uuid(),
      name: path.basename(post).replace(path.extname(post), ''),
      ext: path.extname(post).replace(/^\./g, ''),
      absolutePath: post,
      slug,
      frontmatter,
    })
  }

  // prep result based on supplied sort
  if (args.data.sortBy && args.data.order) {
    let { sortBy, order } = args.data
    if (!['asc', 'desc'].includes(order.toLowerCase())) {
      throw new Error('Invalid sort order supplied, must be one of "ASC" or "DESC"')
    }

    const pre = prop => {
      if (sortBy.toLowerCase() === 'date') {
        return new Date(prop)
      }
      return prop
    }

    if (order.toLowerCase() === 'asc') {
      result.sort((a, b) => (pre(a.frontmatter[sortBy]) < pre(b.frontmatter[sortBy]) ? -1 : 1))
    }

    if (order.toLowerCase() === 'desc') {
      result.sort((a, b) => (pre(a.frontmatter[sortBy]) > pre(b.frontmatter[sortBy]) ? -1 : 1))
    }
  }
  // console.log('RESULT', result)
  return result
}
