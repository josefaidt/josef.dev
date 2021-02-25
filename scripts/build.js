const path = require('path')
const { spawn } = require('child_process')
const { init } = require('../support/db')
// const { $ } = require('@sveltejs/kit/dist/index.js')

function log(text) {
  // return console.info($.bold().cyan(text))
  return console.info(text)
}

const contentPath = path.join(process.cwd(), 'content')

async function main() {
  const { build, load_config } = await import('@sveltejs/kit/api')
  log('Building GraphQL Layer...')
  await init(contentPath)
  log('GraphQL Layer Initialized!')

  const app = require('express')()
  app.use('/___graphql', require('../support/graphql/handler'))
  const server = app.listen(3000, () => log('GraphQL Layer listening'))

  const rm = spawn('rm', ['-rf', 'build'])
  await build(await load_config({ cwd: path.join(__dirname, '../') }))
  server.close()
}

main()
