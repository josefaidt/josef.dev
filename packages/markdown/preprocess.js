const { resolve, extname } = require('path')
const { parse } = require('svelte/compiler')
const fm = require('front-matter')
const glob = require('fast-glob')
const { markdown } = require('./index')

function merge(target, source) {
  return Object.assign(target, source)
}

const defaultOptions = {
  dir: resolve('content'),
}

module.exports = function preprocessMarkdown(_options = {}) {
  console.log('PREPROCESS MARKDOWN')
  const options = merge(defaultOptions, _options)
  console.log({ options })
  return {
    async markup({ content, filename }) {
      if (extname(filename) !== '.md') return
      console.log(`PREPROCESSING ${filename}`)
      const html = await markdown(content)
      return {
        code: html,
        map: '',
      }
    },
    // async script({ content, attributes, filename }) {
    //   console.log('hello from script', { content, filename })
    // },
  }
}
