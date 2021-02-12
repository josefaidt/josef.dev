const { spawn } = require('child_process')

const rm = spawn('rm', ['-rf', 'build'])
const build = spawn('yarn', ['svelte-kit', 'build'])
const app = require('exp../support/graphql/handlerphql', require('../support/graphql/handler'))
const server = app.listen(3000)

build.stdout.on('data', data => {
  console.log(`${data}`)
})

build.stderr.on('data', data => {
  console.log(`${data}`)
})

build.on('error', error => {
  console.log(`${error.message}`)
})

build.on('close', code => {
  console.log(`child process exited with code ${code}`)
  server.close()
})
