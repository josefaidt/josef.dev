const store = require('./store')

module.exports = function insert(doc) {
  return new Promise((resolve, reject) => {
    store.insert(doc, (error, newDoc) => {
      if (error) reject(error)
      else resolve(newDoc)
    })
  })
}
