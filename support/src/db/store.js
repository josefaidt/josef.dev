const { existsSync: exists, rmSync: rm } = require('fs')
const { resolve } = require('path')
const Datastore = require('nedb')
// todo: use a store for caching, store last updated date and check against current for updating records
// const filename = resolve('store.db')
// const store = new Datastore({ filename, autoload: true })
const store = new Datastore()

module.exports = store
