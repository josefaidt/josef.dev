import { marked } from 'marked'
import hljs from 'highlight.js'
import hljsDefineGraphQL from 'highlightjs-graphql'
import readingTime from 'reading-time'
import dayjs from 'dayjs'
import yaml from 'js-yaml'

/**
 * Transforms date to formatted string
 * @param {Date} value
 * @returns {string}
 */
export function date(value) {
  return dayjs(value).format('MMM D, YYYY')
}

const EOL = '\n'

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
function fm(contents, options) {
  const {
    EOL = '\n',
    DELIMITER = '---',
    OPENING = '```yml',
    CLOSING = '```',
  } = options
  let metadata = {}
  let body = contents
  const iterable = contents.split(EOL) || []
  let frontmatter = []
  for (let i = 0; i < iterable.length; i++) {
    const line = iterable[i]
    if (iterable[0] === DELIMITER || iterable[0] === OPENING) {
      frontmatter.push(line)
      if (i === 0) continue
      if (line === DELIMITER || line === CLOSING) {
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
    if (value instanceof Date) metadata[key] = date(value)
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
  highlight: function (code, language) {
    return hljs.highlight(code, { language }).value
  },
})

/**
 * @typedef {object} ProcessedContent
 * @property {Metadata} metadata
 * @property {string} content
 */

/**
 * Process Markdown content
 * @param {string} contents raw markdown file contents
 * @returns {ProcessedContent}
 */
export async function processMarkdown(contents) {
  const { metadata, body } = fm(contents, { EOL: '\r\n' })
  const html = marked.parse(body)

  return { metadata, html }
}
