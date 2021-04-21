// start of markdown package for preprocessing markdown files
const { resolve } = require('path')
const { compile, parse } = require('svelte/compiler')
const unified = require('unified')
const fm = require('front-matter')
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
  // require('escape-html'),
  require('remark-rehype'),
  require('rehype-format'),
  [
    require('rehype-local-image-to-cloudinary'),
    {
      baseDir: resolve('content/posts/images'),
      uploadFolder: 'josef.dev',
      transformations: 'q_auto,f_auto',
    },
  ],
]

exports.markdown = function markdown(content) {
  return new Promise((resolve, reject) => {
    const { attributes: meta, body } = fm(content)
    unified()
      .use(plugins)
      .use(require('rehype-stringify'))
      .process(body, (err, file) => {
        // console.log(file)
        if (err) reject(err)
        else resolve(String(file))
      })
  })
}

exports.preprocess = require('./preprocess')
