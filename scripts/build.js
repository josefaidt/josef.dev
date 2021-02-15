const { spawn } = require('child_process')
const server = require('./server')

const rm = spawn('rm', ['-rf', 'build'])
const build = spawn('yarn', ['svelte-kit', 'build'], {
  stdio: 'inherit',
})

build.on('error', error => {
  console.log(`${error.message}`)
})

build.on('close', code => {
  console.log(`child process exited with code ${code}`)
  server.close()
})
