const { readFileSync } = require('fs')
const { join, resolve } = require('path')
const { buildSchema, graphql } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const merge = require('deepmerge')
const resolvers = require('./graphql/resolvers')
const generatePostData = require('./graphql/generatePostData')
const recursiveReadDir = require('./recursiveReadDir')
const { insert } = require('./db')

const defaultOptions = {
  content: resolve('content'),
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
  console.log('> GraphQL Layer Initialized')
}

module.exports = function GraphQLLayerPlugin(pluginOptions) {
  const options = merge(defaultOptions, pluginOptions)
  init(options)
  const [route, handler] = [
    '/___graphql',
    graphqlHTTP({
      schema: buildSchema(readFileSync(join(__dirname, 'graphql/schema.graphql'), 'utf8')),
      rootValue: resolvers,
      graphiql: true,
    }),
  ]
  return {
    name: 'graphql-layer-plugin',
    configureServer(server) {
      return () => server.middlewares.use(route, handler)
    },
  }
}
