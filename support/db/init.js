import insert from './insert.js'
import update from './update.js'
import findOne from './findOne.js'
import recursiveReadDir from '../recursiveReadDir.js'
import generatePostData from '../graphql/generatePostData.js'

export default async function init(contentPath) {
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
