const { resolve } = require('path')
const merge = require('deepmerge')
const handler = require('./graphql/handler')
const init = require('./init')
const defaultOptions = require('./options')

function log(message) {
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', `${message}`)
}

module.exports = function GraphQLLayerPlugin(pluginOptions) {
  const options = merge(defaultOptions, pluginOptions)
  const route = options.api
  const initMessage = '> GraphQL Layer Initialization'
  return {
    name: 'graphql-layer-plugin',
    options: async () => {
      log('> Initializing GraphQL layer...')
      console.time(initMessage)
      await init(options)
      console.timeEnd(initMessage)
    },
    configureServer: async server => {
      log('> GraphQL layer initialized!')
      server.middlewares.use(route, handler)
    },
  }
}
