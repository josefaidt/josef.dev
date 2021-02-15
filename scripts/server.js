const app = require('express')()
app.use('___graphql', require('../support/graphql/handler'))
const server = app.listen(3000, () => console.log('GraphQL layer listening'))
module.exports = server
