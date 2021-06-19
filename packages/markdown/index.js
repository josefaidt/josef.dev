import vfile from 'to-vfile'
import unified from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import slug from 'remark-slug'
import headings from 'remark-autolink-headings'
import frontmatter from 'remark-frontmatter'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import highlight from '@mapbox/rehype-prism'
import cloudinary from 'rehype-local-image-to-cloudinary'
import readingTime from 'reading-time'
import yaml from 'js-yaml'
import dayjs from 'dayjs'
import config from '@josef/options'

const parser = unified().use(parse).use(gfm).use(frontmatter, ['yaml'])

export async function process(filename) {
  const file = vfile.readSync(filename)
  const tree = parser.parse(file)

  let metadata = {}
  if (tree.children.length > 0 && tree.children[0].type === 'yaml') {
    metadata = yaml.load(tree.children[0].value)
    tree.children = tree.children.slice(1, tree.children.length)
    metadata.date = dayjs(metadata.date).format('MMM D, YYYY')
    metadata.readingTime = readingTime(file?.contents?.toString())
  }

  let remarkPlugins = [slug, [headings, { behavior: 'wrap' }]]
  let rehypePlugins = [highlight]
  // TODO: restructure to use `markdown` config object with remark and rehype plugins?
  if (config.app.cloudinaryConfig) {
    rehypePlugins.push([cloudinary, config.app.cloudinaryConfig])
  }
  const runner = unified()
    .use(remarkPlugins)
    .use(remark2rehype)
    .use(rehypePlugins)
    .use(rehypeStringify)
  const content = runner.stringify(await runner.run(tree))
  return { metadata, content }
}
