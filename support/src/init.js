const generatePostData = require('./graphql/generatePostData')
const recursiveReadDir = require('./recursiveReadDir')
const { insert } = require('./db')
const options = require('./options')

module.exports = async function init({ content, app } = options) {
  const pages = await recursiveReadDir(content)
  for (let page of pages) {
    await insert(await generatePostData(content, page))
  }
  await insert(Object.assign(app, { id: '__app' }))
}
