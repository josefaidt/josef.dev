import { graphql } from 'graphql'
import schema from './schema.js'

function query(str, vars) {
  return graphql(schema, str, null, null, vars)
}

export default query
