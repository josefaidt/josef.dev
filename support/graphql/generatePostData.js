const { promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const recursiveReadDir = require('../recursiveReadDir')

const indexRegex = /index\.(svx|md)$/
module.exports = async function generateMetadata(basePath, postPath) {
  // This will give you a valid svelte component
  let { attributes: frontmatter } = fm(await fs.readFile(postPath, 'utf8'))
  let slug = postPath.replace(basePath, '')

  if (indexRegex.test(slug)) slug = slug.replace(indexRegex, '')

  slug = slug.replace(path.extname(postPath), '')

  // add formatted JS date
  if (frontmatter.date) frontmatter.date = new Date(`${frontmatter.date}`).toString()

  // content zone (i.e. /content/blog -> "blog")
  const zone = (await fs.lstat(path.dirname(postPath))).isDirectory() ? path.basename(path.dirname(postPath)) : null

  return {
    name: path.basename(postPath).replace(path.extname(postPath), ''),
    slug,
    frontmatter,
    zone,
    ext: path.extname(postPath).replace(/^\./g, ''),
    absolutePath: postPath,
  }
}
