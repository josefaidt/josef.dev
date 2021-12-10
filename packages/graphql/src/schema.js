import { existsSync as exists } from 'fs'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import * as resolvers from './resolvers/index.js'

const typeDefsPath = new URL('./schema.graphql', import.meta.url)
const typeDefs = await readFile(typeDefsPath, 'utf-8')

export default makeExecutableSchema({
  typeDefs,
  resolvers: { Query: resolvers },
})
