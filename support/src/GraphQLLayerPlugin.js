const { readFileSync } = require('fs')
const { join } = require('path')
const { buildSchema, graphql } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const resolvers = require('./graphql/resolvers')

module.exports = function GraphQLLayerPlugin() {
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
      server.middlewares.use(route, handler)
    },
  }
}
