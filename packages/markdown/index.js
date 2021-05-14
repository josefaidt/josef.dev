import { resolve } from 'path'
import vfile from 'to-vfile'
import unified from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import frontmatter from 'remark-frontmatter'
import highlight from '@mapbox/rehype-prism'
import cloudinary from 'rehype-local-image-to-cloudinary'
import yaml from 'js-yaml'
import dayjs from 'dayjs'

const parser = unified().use(parse).use(gfm).use(frontmatter, ['yaml'])
const cloudinaryConfig = {
  baseDir: resolve('content/posts'),
  uploadFolder: 'josef.dev',
  transformations: 'q_auto,f_auto',
}
const runner = unified()
  .use(remark2rehype)
  .use(cloudinary, cloudinaryConfig)
  .use(highlight)
  .use(rehypeStringify)

export async function process(filename) {
  const tree = parser.parse(vfile.readSync(filename))
  let metadata = null
  if (tree.children.length > 0 && tree.children[0].type === 'yaml') {
    metadata = yaml.load(tree.children[0].value)
    tree.children = tree.children.slice(1, tree.children.length)
    metadata.date = dayjs(metadata.date).format('MMM D, YYYY')
  }
  const content = runner.stringify(await runner.run(tree))
  return { metadata, content }
}
