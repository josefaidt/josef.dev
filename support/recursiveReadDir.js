const { promises: fs } = require('fs')
const path = require('path')

module.exports = async function recursiveReadDir(
  directory,
  { only = ['svx'], fullPath = true } = { only: ['svx'], fullPath: true }
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
