const { readFileSync } = require('fs')
const { join } = require('path')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')

const schema = makeExecutableSchema({
  typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers: { Query: { ...require('./resolvers') } },
})

const handler = graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
})

module.exports = handler
