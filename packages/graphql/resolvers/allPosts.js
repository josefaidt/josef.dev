export async function allPosts(parent, args, ctx, info) {
  // prep result based on supplied sort
  const files = await import.meta.glob(ctx.files.content.posts)
  let result
  const { sortBy, order } = args.data || {}
  if (!['asc', 'desc'].includes(order.toLowerCase())) {
    throw new Error(
      'Invalid sort order supplied, must be one of "ASC" or "DESC"'
    )
  }

  const pre = prop => {
    if (sortBy.toLowerCase() === 'date') {
      return new Date(prop)
    }
    return prop
  }

  if (order.toLowerCase() === 'asc') {
    result.sort((a, b) =>
      pre(a.frontmatter[sortBy]) < pre(b.frontmatter[sortBy]) ? -1 : 1
    )
  }

  if (order.toLowerCase() === 'desc') {
    result.sort((a, b) =>
      pre(a.frontmatter[sortBy]) > pre(b.frontmatter[sortBy]) ? -1 : 1
    )
  }

  return result
}
