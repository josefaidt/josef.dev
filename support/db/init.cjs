const insert = require('./insert.cjs')
const update = require('./update.cjs')
const findOne = require('./findOne.cjs')
const recursiveReadDir = require('../recursiveReadDir.cjs')
const generatePostData = require('../graphql/generatePostData.cjs')

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
