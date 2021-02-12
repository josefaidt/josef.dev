const store = require('./store')

module.exports = function find(criteria) {
  return new Promise((resolve, reject) => {
    store.findOne(criteria, (error, doc) => {
      if (error) reject(error)
      else resolve(doc)
    })
  })
}
