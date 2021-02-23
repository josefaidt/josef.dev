const { promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const markdown = require('../markdown')

const indexRegex = /index\.(svx|md)$/
module.exports = async function generatePostData(basePath, postPath) {
  // This will give you a valid svelte component
  const { attributes: frontmatter, body: content } = fm(await fs.readFile(postPath, 'utf8'))
  let slug = postPath.replace(basePath, '')

  // if /index, remove that nonsense
  if (indexRegex.test(slug)) slug = slug.replace(indexRegex, '')
  // remove extension
  slug = slug.replace(path.extname(postPath), '')

  // add formatted JS date
  if (frontmatter.date) frontmatter.date = new Date(`${frontmatter.date}`).toString()

  // content zone (i.e. /content/blog -> "blog")
  const zone = (await fs.lstat(path.dirname(postPath))).isDirectory()
    ? path.basename(path.dirname(postPath))
    : null

  const html = await markdown(content)

  return {
    absolutePath: postPath,
    ext: path.extname(postPath).replace(/^\./g, ''),
    frontmatter,
    html,
    name: path.basename(postPath).replace(path.extname(postPath), ''),
    slug,
    zone,
  }
}
