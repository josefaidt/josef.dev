const { spawn } = require('child_process')

module.exports = async function run(command) {
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
      console.log('ERRORRRRRR', error)
      reject(`${error.message}`)
    })

    cmd.on('close', code => {
      resolve(`child process exited with code ${code}`)
    })
  })
}
