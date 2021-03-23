import { readFileSync } from 'fs'
import { resolve } from 'path'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers/index.js'

const schema = makeExecutableSchema({
  typeDefs: readFileSync(resolve('./schema.graphql'), 'utf-8'),
  resolvers: { Query: resolvers },
})
const handler = graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
})

export default handler
