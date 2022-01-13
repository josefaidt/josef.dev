import { graphql } from 'graphql'
import schema from './schema.js'

function query(str, vars) {
  return graphql({ schema, source: str, variableValues: vars })
}

export default query
