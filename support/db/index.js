const store = require('./store')
const insert = require('./insert')
const find = require('./find')
const findOne = require('./findOne')
const update = require('./update')

module.exports = {
  db: store,
  insert,
  find,
  findOne,
  update,
}
