import { graphqlHTTP } from 'express-graphql'
import schema from './schema.js'

const handler = graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
})

export default handler
