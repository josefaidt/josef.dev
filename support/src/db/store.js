import { resolve } from 'path'
import Datastore from 'nedb'
const filename = resolve('./store.db')
// const store = new Datastore({ filename, autoload: true })
const store = new Datastore()

export default store
