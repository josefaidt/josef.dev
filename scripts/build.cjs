const {
  existsSync: exists,
  promises: { rmdir },
} = require('fs')
const { resolve } = require('path')
const express = require('express')
const { handler, init } = require('support')
const run = require('./run.cjs')

function log(text) {
  return console.info(text)
}

const builddir = resolve('build')
const initMessage = '> GraphQL layer initialization'

async function main() {
  log('> Initializing GraphQL layer...')
  console.time(initMessage)
  await init()
  console.timeEnd(initMessage)

  const app = express()
  app.use('/___graphql', handler)
  const server = app.listen(3000, () => log('GraphQL Layer listening'))

  if (exists(builddir)) await rmdir(builddir, { recursive: true })

  try {
    await run('yarn svelte-kit build')
  } catch (error) {
    throw new Error('Error while building site', error)
  } finally {
    log('Build complete')
  }

  log('Closing server')
  server.close()
  log('Success!')
}

main()
