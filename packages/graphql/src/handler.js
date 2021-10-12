import { graphqlHTTP } from 'express-graphql'
import schema from './schema'

const handler = graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
})

export default handler
