const { join } = require('path')
const unified = require('unified')
const visit = require('unist-util-visit')

const retextPlugins = [
  require('retext-english'),
  require('retext-profanities'),
  [require('retext-emoji'), { convert: 'encode' }],
  require('retext-smartypants'),
]

function retext() {
  const processor = require('retext')().use(retextPlugins)

  return function (tree) {
    visit(tree, 'text', node => {
      node.value = String(processor.processSync(node.value))
    })
  }
}

const plugins = [
  require('remark-parse'),
  require('remark-autolink-headings'),
  require('remark-slug'),
  retext,
  require('remark-rehype'),
  require('rehype-format'),
  [
    require('rehype-local-image-to-cloudinary'),
    {
      baseDir: join(process.cwd(), 'static'),
      uploadFolder: 'josef.dev',
      transformations: 'q_auto,f_auto',
    },
  ],
  require('rehype-stringify'),
]

module.exports = function markdown(content) {
  return new Promise((resolve, reject) => {
    unified()
      .use(plugins)
      .process(content, (err, file) => {
        if (err) reject(err)
        else resolve(String(file))
      })
  })
}
