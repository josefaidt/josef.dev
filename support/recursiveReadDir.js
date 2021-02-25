import { promises as fs } from 'fs'
import path from 'path'

export default async function recursiveReadDir(
  directory,
  { only = ['md', 'svx'], fullPath = true } = { only: ['md', 'svx'], fullPath: true }
) {
  const result = []
  const crawl = async filePath => {
    const files = await fs.readdir(filePath, { withFileTypes: true })
    for (const file of files) {
      const _path = path.join(filePath, file.name)
      if (file.isDirectory()) await crawl(_path)
      else if (only.some(o => path.extname(file.name).replace(/^\./, '') === o)) {
        if (fullPath) {
          result.push(_path)
        } else {
          result.push(_path.replace(directory, '').replace(path.extname(_path), ''))
        }
      }
    }
  }
  await crawl(directory)
  return result
}
