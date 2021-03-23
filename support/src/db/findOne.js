import store from './store.js'

export default function findOne(criteria) {
  return new Promise((resolve, reject) => {
    store.findOne(criteria, (error, doc) => {
      if (error) reject(error)
      else resolve(doc)
    })
  })
}
