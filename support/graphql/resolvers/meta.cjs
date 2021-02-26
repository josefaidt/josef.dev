const path = require('path')

module.exports = function queryMeta(parent, args, ctx, info) {
  const appConfig = require(path.resolve('app.config.cjs'))
  return appConfig || {}
}
