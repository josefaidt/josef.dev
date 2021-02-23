const unified = require('unified')

const plugins = [
  require('remark-parse'),
  require('remark-rehype'),
  require('rehype-format'),
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
