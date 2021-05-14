import { process } from '@josef/markdown'
import fs from 'fs'
import dayjs from 'dayjs'

export async function get(req) {
  const files = fs
    .readdirSync(`content${req.path.replace(/\.json$/, '')}`)
    .filter(fileName => /.+\.md$/.test(fileName))
  // .map(fileName => {
  //   const { metadata } = Promise.resolve(process(`content/posts/${fileName}`))
  //   return {
  //     metadata,
  //     slug: fileName.slice(0, -3),
  //   }
  // })

  let posts = []
  for (let post of files) {
    posts.push({
      metadata: (await process(`content/posts/${post}`)).metadata,
      slug: `/posts/${post.slice(0, -3)}`,
    })
  }

  console.log('POSTS', posts)
  // sort the posts by create date.
  posts.sort(
    (a, b) =>
      dayjs(b.metadata.date, 'MMM D, YYYY') -
      dayjs(a.metadata.date, 'MMM D, YYYY')
  )
  const body = JSON.stringify(posts)

  console.log('RETURNING BODY', body)
  return {
    body,
  }
}
