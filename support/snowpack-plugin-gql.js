const path = require('path')
const { insert } = require('./db')
const handler = require('./graphql/handler')
const generatePostData = require('./graphql/generatePostData')
const recursiveReadDir = require('./recursiveReadDir')

const route = {
  src: '^/___graphql$',
  dest: handler,
  match: 'all',
  _srcRegex: /^\/___graphql$/,
}

module.exports = function SnowpackPluginGraphQL(snowpackConfig, pluginOptions) {
  const defaultOptions = {
    content: path.resolve('content'),
  }

  return {
    name: 'snowpack-plugin-gql',

    async config() {
      if (snowpackConfig.routes && Array.isArray(snowpackConfig.routes)) {
        snowpackConfig.routes.push(route)
      }

      const options = {
        ...defaultOptions,
        ...(pluginOptions || {}),
      }

      const pages = await recursiveReadDir(options.content)
      for (let page of pages) {
        await insert(await generatePostData(options.content, page))
      }

      console.info('\nGraphQL Layer Initialized!')
    },

    // async run() {

    // },
  }
}
