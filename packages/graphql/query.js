import { graphql } from 'graphql'
import schema from './schema'

function query(str) {
  return graphql(schema, str)
}

export default query
