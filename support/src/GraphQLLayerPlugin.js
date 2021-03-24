const { resolve } = require('path')
const merge = require('deepmerge')
const handler = require('./graphql/handler')
const generatePostData = require('./graphql/generatePostData')
const recursiveReadDir = require('./recursiveReadDir')
const { insert } = require('./db')

const defaultOptions = {
  content: resolve('content'),
  api: '/___graphql',
  app: {
    title: 'Svelte App',
    url: '',
    description: 'Svelte app',
    keywords: ['svelte', 'app'],
    author: 'josefaidt',
  },
}

async function init({ content, app }) {
  const pages = await recursiveReadDir(content)
  for (let page of pages) {
    await insert(await generatePostData(content, page))
  }
  await insert(Object.assign(app, { _id: '__app' }))
}

function log(message) {
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', `${message}`)
}

module.exports = function GraphQLLayerPlugin(pluginOptions) {
  const options = merge(defaultOptions, pluginOptions)
  const route = options.api
  const initMessage = '> GraphQL Layer Initialization'
  return {
    name: 'graphql-layer-plugin',
    configureServer: async server => {
      log('> Initializing GraphQL layer...')
      console.time(initMessage)
      await init(options)
      console.timeEnd(initMessage)
      log('> GraphQL layer initialized!')
      server.middlewares.use(route, handler)
      // return () => server.middlewares.use(route, handler)
    },
  }
}
