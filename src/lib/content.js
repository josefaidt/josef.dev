import { createClient } from '@urql/core'
import _slugify from 'slugify'
import { processMarkdown, date } from './markdown'
import { listPageViews } from './analytics'

const POST_DISCUSSION_CATEGORY_ID = 'DIC_kwDOFFxubs4CAsIL'

function slugify(str) {
  return _slugify(str, {
    replacement: '-',
    lower: true,
    strict: true,
  })
}

/**
 *
 * @param {object} options
 * @property {string} options.sortBy
 * @property {string} options.order
 */
export function sortByDate(content, options = {}) {
  const { sortBy = 'date', order = 'desc' } = options

  const pre = (prop) => {
    if (sortBy.toLowerCase() === 'date') {
      return new Date(prop)
    }
    return prop
  }

  if (order.toLowerCase() === 'asc') {
    content.sort((a, b) =>
      pre(a.metadata[sortBy]) < pre(b.metadata[sortBy]) ? -1 : 1
    )
  }

  if (order.toLowerCase() === 'desc') {
    content.sort((a, b) =>
      pre(a.metadata[sortBy]) > pre(b.metadata[sortBy]) ? -1 : 1
    )
  }

  return content
}

export const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: () => {
    return {
      headers: { authorization: `bearer ${process.env['GITHUB_TOKEN']}` },
    }
  },
})

export async function query(queryString, variables = {}) {
  return client.query(queryString, variables).toPromise()
}

export const QUERY_LIST_CONTENT = `
query($discussionsCategoryId: ID!, $issueLabels: [String!], $first: Int = 100) { 
  viewer {
    repository(name:"josef.dev") {
      issues(filterBy: {createdBy: "josefaidt"}, states: [OPEN], labels: $issueLabels, first: $first) {
        totalCount
        edges {
          node {
            author {
              avatarUrl
              login
            }
            labels(first:20) {
              edges {
                node {
                  name
                }
              }
            }
            title
            body
          }
        }
      }
      discussions(categoryId: $discussionsCategoryId, first: $first) {
        edges {
          node {
            createdAt
            lastEditedAt
            author {
              login
              avatarUrl
            }
            title
            body
            category {
              name
            }
          }
        }
      }
    }
  }
}
`

export const QUERY_LIST_DISCUSSION_POSTS = `
query($categoryId: ID!, $first: Int = 100) {
  viewer {
    repository(name: "josef.dev") {
      discussions(categoryId: $categoryId, first: $first) {
        edges {
          node {
            createdAt
            lastEditedAt
            author {
              login
              avatarUrl
            }
            title
            body
          }
        }
      }
    }
  }
}
`

export const QUERY_LIST_DISCUSSION_CATEGORIES = `
query {
  viewer {
    repository(name: "josef.dev") {
      discussionCategories(filterByAssignable: true, first: 50) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
}
`

export async function generateContentFromGithub(nodes, options = {}) {
  const { slugPrefix = '/', type } = options
  let content = []
  for (let { node } of nodes) {
    let published = options.published || false
    let { metadata, html } = await processMarkdown(node.body)

    metadata.title = node.title
    metadata.type = type

    if (!metadata.tags) metadata.tags = []
    if (!metadata.date) {
      metadata.date = date(
        node.editedAt > node.createdAt ? node.editedAt : node.createdAt
      )
    }

    if (node.labels) {
      metadata._labels = node.labels.edges.map(({ node }) => node.name)
      published = node.labels.edges.some(
        ({ node: label }) => label.name === 'status/published'
      )
      metadata.type = metadata._labels
        .find((label) => label.startsWith('type/'))
        .split('/')[1]
    }

    content.push({
      author: node.author.login,
      metadata,
      html,
      slug: metadata.slug || slugPrefix + slugify(metadata.title),
      published,
    })
  }
  return content
}

export async function listContent(options = {}) {
  const {
    labels = [
      'type/post',
      'type/page',
      'type/page-fragment',
      'status/not-published',
      'status/published',
    ],
  } = options
  const { data, error } = await query(QUERY_LIST_CONTENT, {
    issueLabels: labels,
    discussionsCategoryId: POST_DISCUSSION_CATEGORY_ID,
  })
  if (error) {
    throw new Error('Unable to list content', error)
  }
  const nodes = await generateContentFromGithub(
    [
      ...data.viewer.repository.issues.edges,
      ...data.viewer.repository.discussions.edges,
    ],
    options
  )

  let pageViews
  let content = nodes

  try {
    pageViews = await listPageViews()
  } catch (error) {
    // don't worry about throwing error
    // most likely errors 429 in local dev
    // console.error('error fetching list page views')
  }

  content = nodes.map((node) => {
    let views = pageViews?.find(({ path }) => path === node.slug)
    node.metadata.views = views?.event_count || 0
    return node
  })

  return sortByDate(content, options)
}

export async function listPageFragments(options = {}) {
  const content = await listContent({
    labels: ['type/page-fragment', 'status/not-published', 'status/published'],
  })
  return content
}

export async function listDiscussionPosts(options = {}) {
  const { data, error } = await query(QUERY_LIST_DISCUSSION_POSTS, {
    categoryId: POST_DISCUSSION_CATEGORY_ID,
  })

  if (error) {
    throw new Error('Unable to list content', error)
  }
  const content = await generateContentFromGithub(
    data.viewer.repository.discussions.edges,
    { ...options, slugPrefix: '/posts/', type: 'post' }
  )

  return sortByDate(content, options)
}

export async function listPosts() {
  const content = await listContent({ slugPrefix: '/posts/', type: 'post' })
  return content.filter(({ metadata }) => metadata.type === 'post')
}

export async function getPost(slug) {
  const posts = await listPosts()
  const post = posts.find(({ slug: postSlug }) => postSlug === slug)
  return post
}

export async function listPages() {
  const content = await listContent()
  let allowedTypes = ['page', 'page-fragment']
  return content.filter(({ metadata }) => allowedTypes.includes(metadata.type))
}

export async function getPage(slug, options = {}) {
  const { fragment = false } = options
  const pages = await listPages()
  const page = pages.find(({ slug: pageSlug }) => pageSlug === slug)
  return page
}
