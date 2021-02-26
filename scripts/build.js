import path from 'path'
import { spawn } from 'child_process'
import { init } from '@josefaidt/support/db'
import { handler } from '@josefaidt/support/graphql'
import express from 'express'
// const { $ } from '@sveltejs/kit/dist/index.js'

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

  const app = express()
  app.use('/___graphql', handler)
  const server = app.listen(3000, () => log('GraphQL Layer listening'))

  const rm = spawn('rm', ['-rf', 'build'])
  await build(await load_config({ cwd: path.join(__dirname, '../') }))
  server.close()
}

main()
