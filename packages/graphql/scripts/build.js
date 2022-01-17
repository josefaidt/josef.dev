import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { build } from 'esbuild'
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader'

const pkg = JSON.parse(await readFile(resolve('package.json'), 'utf8'))
const args = process.argv.slice(2)
const argRegex = /^--(?<name>\w+)$/
const name = (arg) => arg?.match(argRegex)?.groups?.name
const argHash = Object.fromEntries(
  args.reduce((acc, value, index, source) => {
    const argName = name(value)
    if (argName) {
      const next = source[index + 1]
      if (name(next) || !next) {
        acc.push([argName, true])
      } else {
        acc.push([argName, isNaN(parseFloat(next)) ? next : parseFloat(next)])
      }
    }
    return acc
  }, [])
)

await build({
  entryPoints: [resolve('src/index.js')],
  outdir: resolve('build'),
  bundle: true,
  minify: false,
  format: 'esm',
  platform: 'node',
  plugins: [graphqlLoaderPlugin?.default()],
  external: [...Object.keys(pkg.dependencies)],
  watch: argHash?.watch || false,
})
await build({
  entryPoints: [resolve('src/index.js')],
  // outdir: resolve('out'),
  outfile: resolve('build/index.cjs'),
  bundle: true,
  minify: false,
  format: 'cjs',
  platform: 'node',
  plugins: [graphqlLoaderPlugin?.default()],
  external: Object.keys(pkg.dependencies),
  watch: argHash?.watch || false,
})
