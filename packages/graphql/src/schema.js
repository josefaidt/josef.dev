import { readFile } from 'fs/promises'
import { makeExecutableSchema } from '@graphql-tools/schema'
import * as resolvers from './resolvers/index.js'

const schema = await readFile(
  new URL('./schema.graphql', import.meta.url),
  'utf-8'
)

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers: { Query: resolvers },
})
