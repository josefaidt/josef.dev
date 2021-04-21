// pull in pages content
const files = import.meta.glob('../../content/*.md')
export const pages = Object.entries(files).map(([path, page]) => {
  return {
    component: page,
    slug: path.replace('../../content', '').replace(/\.(md)$/, ''),
  }
})

export async function get(url) {
  const page = pages.find(({ slug }) => slug === url)
  let component, metadata, slug
  if (page) {
    slug = page.slug
    const parsed = await page.component()
    component = parsed.default
    metadata = parsed.metadata
  }
  return {
    slug,
    component,
    metadata,
  }
}

export default pages
