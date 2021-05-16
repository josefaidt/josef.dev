import { makeExecutableSchema } from '@graphql-tools/schema'
import * as resolvers from './resolvers'
import schema from './schema.graphql'

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers: { Query: resolvers },
})
