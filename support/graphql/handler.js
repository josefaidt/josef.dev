const fs = require('fs')
const path = require('path')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

module.exports = graphqlHTTP({
  schema: buildSchema(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')),
  rootValue: require('./resolvers'),
  graphiql: true,
})
