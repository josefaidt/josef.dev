const path = require('path')
const { spawn } = require('child_process')
const express = require('express')
// const { init } = require('../support/db')
// const handler = require('../support/graphql/handler')

function log(text) {
  return console.info(text)
}

async function run(command) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(
      ...command.split(' ').reduce((acc, value, index, source) => {
        if (index === 0) acc = [value]
        else {
          Array.isArray(acc[1]) ? acc[1].push(value) : (acc[1] = [value])
        }
        return acc
      }, []),
      { stdio: 'inherit' }
    )

    cmd.on('error', error => {
      reject(`${error.message}`)
    })

    cmd.on('close', code => {
      resolve(`child process exited with code ${code}`)
    })
  })
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
