const { spawn } = require('child_process')
const express = require('express')
const { handler } = require('support')
const run = require('./run.cjs')

function log(text) {
  return console.info(text)
}

async function main() {
  const app = express()
  app.use('/___graphql', handler)
  const server = app.listen(3000, () => log('GraphQL Layer listening'))

  const rm = spawn('rm', ['-rf', 'build'])
  try {
    await run('svelte-kit build')
  } catch (error) {
    throw new Error('Error while building site', error)
  }
  log('Build complete')
  try {
    await run('svelte-kit adapt')
  } catch (error) {
    console.error(error)
  }
  log('Adapt complete')
  log('Closing server')
  server.close()
  log('Success!')
}

main()
