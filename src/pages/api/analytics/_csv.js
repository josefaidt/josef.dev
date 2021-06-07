import { readFile } from 'fs/promises'
import { resolve } from 'path'

const data = (await readFile(resolve('./_josefaidt-dev-metrics.csv'), 'utf8'))
  .split('\n')
  .map(line => line.split(','))

export function getViewsFromSlug(slug) {
  return data.find(([oldSlug, views]) => oldSlug.contains(slug))?.[1]
}
