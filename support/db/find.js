const store = require('./store')

module.exports = function find(criteria) {
  return new Promise((resolve, reject) => {
    store.find(criteria, (error, docs) => {
      if (error) reject(error)
      else resolve(docs)
    })
  })
}
