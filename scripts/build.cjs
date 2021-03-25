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

async function main() {
  const app = express()
  await init()
  app.use('/___graphql', handler)
  const server = app.listen(3000, () => log('GraphQL Layer listening'))

  if (exists(builddir)) await rmdir(builddir)

  try {
    await run('yarn svelte-kit build')
  } catch (error) {
    throw new Error('Error while building site', error)
  } finally {
    log('Build complete')
  }

  try {
    await run('yarn svelte-kit adapt')
  } catch (error) {
    console.error(error)
  } finally {
    log('Adapt complete')
  }

  log('Closing server')
  server.close()
  log('Success!')
}

main()
