import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema'

const handler = graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
})

export default handler
