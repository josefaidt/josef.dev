import { createClient } from '@urql/core'
import _slugify from 'slugify'
import { processMarkdown } from './markdown.js'

function slugify(str) {
  return _slugify(str, {
    replacement: '-',
    lower: true,
    strict: true,
  })
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
query($labels: [String!], $first: Int = 100) { 
  viewer {
    repository(name:"josef.dev") {
      issues(states: [OPEN], labels: $labels, first: $first) {
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
    }
  }
}
`

export async function generateContentFromGithub(nodes, options = {}) {
  const { slugPrefix = '/' } = options
  let content = []
  for (let { node } of nodes) {
    const { metadata, html } = await processMarkdown(node.body)
    metadata.title = node.title
    metadata._labels = node.labels.edges.map(({ node }) => node.name)
    metadata.type = metadata._labels
      .find(label => label.startsWith('type/'))
      .split('/')[1]
    content.push({
      author: node.author.login,
      metadata,
      html,
      slug: slugPrefix + slugify(metadata.title),
      published: node.labels.edges.some(
        ({ node: label }) => label.name === 'status/published'
      ),
    })
  }
  return content
}

export async function listContent(options = {}) {
  const { data, error } = await query(QUERY_LIST_CONTENT, {
    labels: [
      'type/post',
      'type/page',
      'status/not-published',
      'status/published',
    ],
  })
  if (error) {
    throw new Error('Unable to list content', error)
  }
  const content = await generateContentFromGithub(
    data.viewer.repository.issues.edges,
    options
  )

  const { sortBy = 'date', order = 'desc' } = options

  const pre = prop => {
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

export async function listPosts() {
  const content = await listContent({ slugPrefix: '/posts/' })
  return content.filter(({ metadata }) => metadata.type === 'post')
}

export async function getPost(slug) {
  const posts = await listPosts()
  const post = posts.find(({ slug: postSlug }) => postSlug === slug)
  return post
}

export async function listPages() {
  const content = await listContent()
  return content.filter(({ metadata }) => metadata.type === 'page')
}

export async function getPage(slug) {
  const pages = await listPages()
  const page = pages.find(({ slug: pageSlug }) => pageSlug === slug)
  return page
}
