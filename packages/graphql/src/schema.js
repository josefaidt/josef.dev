import { existsSync as exists } from 'fs'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import * as resolvers from './resolvers/index.js'

// const typeDefsPath = new URL('./schema.graphql', import.meta.url)
// const typeDefs = await readFile(typeDefsPath, 'utf-8')

const typeDefs = `
interface Node {
  _id: ID!
  name: String!
  ext: String!
  absolutePath: String!
  zone: String!
}

type ReadingTime {
  text: String
  minutes: Float
  time: Int
  words: Int
}

type NodeMetadata {
  title: String
  date: String
  description: String
  tags: [String]
  keywords: [String]
  published: Boolean
  readingTime: ReadingTime
}

type Post implements Node {
  _id: ID!
  name: String!
  ext: String!
  html: String!
  absolutePath: String!
  slug: String
  metadata: NodeMetadata!
  zone: String!
}

type Page implements Node {
  _id: ID!
  name: String!
  ext: String!
  html: String!
  absolutePath: String!
  slug: String
  metadata: NodeMetadata!
  zone: String!
}

type SiteMetadata {
  title: String!
  author: String!
  handle: String!
  url: String!
  description: String
  keywords: [String]
}

enum DateInputType {
  long
  short
  numeric
}

input LocaleDateStringOptions {
  year: DateInputType
  month: DateInputType
  day: DateInputType
}

enum SortDirection {
  ASC
  DESC
}

input InputData {
  sortBy: String = "date"
  order: SortDirection = DESC
}

input Options {
  toLocaleDateStringOptions: LocaleDateStringOptions
  published: Boolean = true
}

type Query {
  allPosts(
    sortBy: String = "date"
    order: SortDirection = DESC
    options: Options = {}
  ): [Post]!
  allPages(options: Options = {}): [Page]!
  post(slug: String!, options: Options = {}): Post
  page(slug: String!, options: Options = {}): Page
  metadata: SiteMetadata!
}
`

export default makeExecutableSchema({
  typeDefs,
  resolvers: { Query: resolvers },
})
