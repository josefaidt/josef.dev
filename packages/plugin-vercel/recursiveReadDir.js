import fs from 'fs/promises'
import path from 'path'

export default async function recursiveReadDir(
  directory,
  { only = ['js'], fullPath = true, ignore = [/^_/] } = {
    only: ['js'],
    ignore: [/^_/],
    fullPath: true,
  }
) {
  const result = []
  const crawl = async filePath => {
    const files = await fs.readdir(filePath, { withFileTypes: true })
    for (const file of files) {
      const _path = path.join(filePath, file.name)
      if (file.isDirectory() && !/node_modules/.test(_path)) await crawl(_path)
      else if (
        only.some(o => path.extname(file.name).replace(/^\./, '') === o)
      ) {
        if (ignore.some(i => i.test(file.name))) continue
        else if (fullPath) {
          result.push(_path)
        } else {
          result.push(
            _path.replace(directory, '').replace(path.extname(_path), '')
          )
        }
      }
    }
  }
  await crawl(directory)
  return result
}
