// const path = require('path')
import path from 'path'
// const { spawn } = require('child_process')
import { spawn } from 'child_process'
import express from 'express'
// const server = require('./server')
// const { init } = require('../support/db')
// import { init } from '../support/db'
// const { $ } = require('@sveltejs/kit/dist/index.js')
// const { build } = require('@sveltejs/kit/api')
import { build } from '@sveltejs/kit/api'

function log(text) {
  // return console.info($.bold().cyan(text))
  return console.info(text)
}

const contentPath = path.join(process.cwd(), 'content')

async function main() {
  log('Building GraphQL Layer...')
  // await init(contentPath)
  log('GraphQL Layer Initialized!')

  const app = express()
  // app.use('___graphql', require('../support/graphql/handler'))
  const server = app.listen(3000, () => log('GraphQL Layer listening'))

  const rm = spawn('rm', ['-rf', 'build'])
  await build()
  // const build = spawn('yarn', ['svelte-kit', 'build'], {
  //   stdio: 'inherit',
  // })

  // build.on('error', error => {
  //   console.log(`${error.message}`)
  // })

  // build.on('close', code => {
  //   console.log(`child process exited with code ${code}`)
  //   server.close()
  // })
}

main()
