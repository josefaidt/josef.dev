const store = require('./store')
const insert = require('./insert')
const find = require('./find')
const findOne = require('./findOne')

module.exports = {
  db: store,
  insert,
  find,
  findOne,
}
