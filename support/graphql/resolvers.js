const { promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const recursiveReadDir = require('../recursiveReadDir')

module.exports = {
  allPosts: async (args, ctx, info) => {
    let result = []
    let postPath
    if (args.directory) {
      postPath = path.resolve(args.directory)
    } else {
      const base = process.cwd()
      postPath = path.join(base, 'pages/blog')
    }
    const posts = await recursiveReadDir(postPath)
    for (let post of posts) {
      // This will give you a valid svelte component
      let { attributes: frontmatter } = fm(await fs.readFile(post, 'utf8'))
      let slug = post.replace(postPath, '/blog')
      if (slug.endsWith('/index.svx')) slug = slug.replace(/\/index\.svx$/g, '')
      else if (slug.endsWith('.svx')) slug = slug.replace('.svx', '')

      if (frontmatter.date) frontmatter.date = new Date(`${frontmatter.date}`).toDateString()
      // push prepped node data
      result.push({
        name: path.basename(post).replace(path.extname(post), ''),
        ext: path.extname(post).replace(/^\./g, ''),
        absolutePath: post,
        slug,
        frontmatter,
      })
    }
    // console.log('RESULT', result)
    return result
  },
}
