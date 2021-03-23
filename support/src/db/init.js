const insert = require('./insert')
const update = require('./update')
const findOne = require('./findOne')
const recursiveReadDir = require('../recursiveReadDir')
const generatePostData = require('../graphql/generatePostData')

module.exports = async function init(contentPath) {
  const pages = await recursiveReadDir(contentPath)
  for (let page of pages) {
    // const existing = await findOne({ absolutePath: page })
    // if (existing) {
    //   await update(
    //     { absolutePath: page },
    //     {
    //       $set: { ...(await generatePostData(contentPath, page)) },
    //     }
    //   )
    // } else {
    await insert(await generatePostData(contentPath, page))
    // }
  }
}
