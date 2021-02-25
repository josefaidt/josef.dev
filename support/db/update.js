import store from './store'

export default async function update(...args) {
  return new Promise((resolve, reject) => {
    store.update(...args, (err, numReplaced) => {
      if (err) reject(err)
      else resolve(numReplaced)
    })
  })
}
