const store = require('./store')
const insert = require('./insert')
const init = require('./init')
const find = require('./find')
const findOne = require('./findOne')
const update = require('./update')

module.exports = {
  db: store,
  init,
  insert,
  find,
  findOne,
  update,
}
