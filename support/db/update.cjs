const store = require('./store.cjs')

module.exports = async function update(...args) {
  return new Promise((resolve, reject) => {
    store.update(...args, (err, numReplaced) => {
      if (err) reject(err)
      else resolve(numReplaced)
    })
  })
}
