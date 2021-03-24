const path = require('path')
const { findOne } = require('../../db')

module.exports = async function queryMeta(parent, args, ctx, info) {
  return await findOne({ _id: '__app' })
}
