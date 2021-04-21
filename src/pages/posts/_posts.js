// pull in posts content
const files = import.meta.glob('../../../content/posts/**/*.md')
// pull in posts content
export const posts = Object.entries(files).map(([path, post]) => {
  return {
    component: post,
    slug: path.replace('../../../content', '').replace(/\.(md)$/, ''),
  }
})

export async function getAllPosts() {
  let result = []
  for (let post of posts) {
    const { default: component, metadata } = await post.component()
    result.push({
      component,
      metadata,
      slug: post.slug,
    })
  }
  return result
}

export async function get(url) {
  const post = posts.find(({ slug }) => slug === url)
  let component, metadata, slug
  if (post) {
    slug = post.slug
    const parsed = await post.component()
    component = parsed.default
    metadata = parsed.metadata
  }
  return {
    slug,
    component,
    metadata,
  }
}

export default posts
