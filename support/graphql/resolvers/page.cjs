const { findOne } = require('../../db/index.cjs')

module.exports = async function queryPage(parent, args, ctx, info) {
  const { slug } = args || {}
  if (!slug) throw new Error('Invalid slug supplied')
  return await findOne({ slug })
}
