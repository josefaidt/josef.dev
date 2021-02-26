import { findOne } from '../../db.js'

export default async function queryPost(parent, args, ctx, info) {
  const { slug } = args || {}
  if (!slug) throw new Error('Invalid slug supplied')
  return await findOne({ slug })
}
