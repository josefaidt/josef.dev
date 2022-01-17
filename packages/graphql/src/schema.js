import { makeExecutableSchema } from '@graphql-tools/schema'
import * as resolvers from './resolvers/index.js'

// this does not work with Vite ssr
// const typeDefsPath = new URL('./schema.graphql', import.meta.url)
// const typeDefs = await readFile(typeDefsPath, 'utf-8')

const typeDefs = `
type SiteMetadata {
  title: String!
  author: String!
  handle: String!
  url: String!
  description: String
  keywords: [String]
}

type Query {
  metadata: SiteMetadata!
}
`

export default makeExecutableSchema({
  typeDefs,
  resolvers: { Query: resolvers },
})
