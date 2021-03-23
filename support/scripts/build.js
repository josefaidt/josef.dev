const {
  existsSync: exists,
  promises: { copyFile, rmdir, rename },
} = require('fs')
const { resolve, join } = require('path')
const { build } = require('esbuild')
const recursiveReadDir = require('../src/recursiveReadDir')

const outdir = resolve('lib')
const srcdir = resolve('src')
const [subcommand] = process.argv.slice(2)

async function main() {
  if (exists(outdir)) await rmdir(outdir, { recursive: true })
  const entryPoints = await recursiveReadDir(srcdir, { only: ['js'] })
  try {
    await build({
      entryPoints,
      outdir,
      minify: false,
      platform: 'node',
      format: 'cjs',
      target: 'node14',
      watch: subcommand === 'watch',
    })
  } catch (error) {
    throw new Error(error)
  }

  try {
    const schema = 'graphql/schema.graphql'
    await copyFile(join(srcdir, schema), join(outdir, schema))
  } catch (error) {
    throw new Error(error)
  }
}

main()
