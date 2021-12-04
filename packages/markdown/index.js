import { readFile } from 'fs/promises'
import { EOL } from 'os'
import { marked } from 'marked'
import hljs from 'highlight.js'
import hljsDefineGraphQL from 'highlightjs-graphql'
import readingTime from 'reading-time'
import dayjs from 'dayjs'
import yaml from 'js-yaml'

/**
 * @typedef {object} Metadata
 * @property {string} [title]
 * @property {string} [date] transformed date string
 * @property {boolean} [fragment]
 * @property {boolean} [published]
 */

/**
 * @typedef {object} Frontmatter
 * @property {Metadata} metadata
 * @property {string} body
 */

/**
 * Generates frontmatter object from Markdown
 * @function fm
 * @param {string} fileContents
 * @returns {Frontmatter}
 */
function fm(fileContents) {
  const DELIMITER = '---'
  let metadata = {}
  let body = fileContents
  const iterable = fileContents.split(EOL) || []

  let frontmatter = []
  for (let i = 0; i < iterable.length; i++) {
    const line = iterable[i]
    if (iterable[0] === DELIMITER) {
      frontmatter.push(line)
      if (i === 0) continue
      if (line === DELIMITER) {
        frontmatter = frontmatter.slice(1, -1).join(EOL)
        // check if contents have empty line after frontmatter
        const sliceLength = !iterable[i + 2] ? i + 1 : i + 2
        body = iterable.slice(sliceLength).join(EOL)
        break
      }
    }
  }
  try {
    metadata = yaml.load(frontmatter)
  } catch (error) {
    throw new Error('Unable to parse yaml frontmatter', error)
  }

  // transform dates
  for (let [key, value] of Object.entries(metadata || {})) {
    if (value instanceof Date)
      metadata[key] = dayjs(value).format('MMM D, YYYY')
  }
  metadata.readingTime = readingTime(body)

  return { metadata, body }
}

hljsDefineGraphQL(hljs)
hljs.configure({ classPrefix: '' })
marked.use({
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: false,
  highlight: function (code, lang) {
    return hljs.highlight(lang, code).value
  },
})

/**
 * @typedef {object} ProcessedContent
 * @property {Metadata} metadata
 * @property {string} content
 */

/**
 * Process Markdown file
 * @param {string} filePath absolute path to file
 * @returns {ProcessedContent}
 */
export async function process(filePath) {
  const fileContents = await readFile(filePath, 'utf-8')
  const { metadata, body } = fm(fileContents)
  const content = marked.parse(body)

  return { metadata, content }
}
