import { readFileSync } from 'fs'
// import { resolve } from 'path'

// const data = readFileSync('./_josefaidt-dev-metrics.csv', 'utf8')
//   .split('\n')
//   .map(line => line.split(','))
const data = []
export function getViewsFromSlug(slug) {
  return data.find(([oldSlug, views]) => oldSlug.contains(slug))?.[1]
}
