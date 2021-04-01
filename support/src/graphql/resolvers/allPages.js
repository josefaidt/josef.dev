const { find } = require('../../db')

module.exports = async function queryAllPages(parent, args, ctx, info) {
  return await find({ zone: 'content' })
}
