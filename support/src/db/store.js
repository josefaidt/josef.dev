const { join } = require('path')
const Datastore = require('nedb')
// todo: use a store for caching, store last updated date and check against current for updating records
// const filename = join(__dirname, 'store.db')
// const store = new Datastore({ filename, autoload: true })
const store = new Datastore()

module.exports = store
