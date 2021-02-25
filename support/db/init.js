import insert from './insert'
import update from './update'
import findOne from './findOne'
import recursiveReadDir from '../recursiveReadDir'
import generatePostData from '../graphql/generatePostData'

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
