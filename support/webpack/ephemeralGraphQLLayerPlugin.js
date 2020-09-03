const handler = require('../graphql/handler')
const { PORT } = require('./config')

module.exports = class EphemeralGraphQLLayerPlugin {
  constructor(options) {
    this.app = require('express')()
    this.server
  }
  apply(compiler) {
    compiler.hooks.beforeRun.tap('GraphQLLayerPlugin', async compiler => {
      this.app.use('/___graphql', handler)
      this.server = this.app.listen(PORT)
    })
    compiler.hooks.done.tap('GraphQLLayerPlugin', async compiler => {
      this.server.close()
    })
  }
}
