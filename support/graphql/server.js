const app = require('express')()
app.use('/___graphql', require('./handler'))
app.listen(3005, () => console.log('GraphQL layer running at http://localhost:3000/___graphql'))
