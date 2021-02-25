const path = require('path')
const Datastore = require('nedb')
const filename = path.join(__dirname, 'store.db')
// const store = new Datastore({ filename, autoload: true })
const store = new Datastore()

module.exports = store
