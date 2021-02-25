import path from 'path'
import Datastore from 'nedb'
const filename = path.join(__dirname, 'store.db')
// const store = new Datastore({ filename, autoload: true })
const store = new Datastore()

export default store
