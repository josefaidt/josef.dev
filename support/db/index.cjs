const store = require('./store.cjs')
const insert = require('./insert.cjs')
const init = require('./init.cjs')
const find = require('./find.cjs')
const findOne = require('./findOne.cjs')
const update = require('./update.cjs')

module.exports = {
  db: store,
  init,
  insert,
  find,
  findOne,
  update,
}
