const path = require('path')

module.exports = function queryMeta(args, ctx, info) {
  const appConfig = require(path.resolve('app.config.js'))
  return appConfig
}
