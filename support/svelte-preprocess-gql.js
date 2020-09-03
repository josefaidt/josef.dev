const acorn = require('acorn')
const walk = require('acorn-walk')
const { request } = require('graphql-request')
const { PORT } = require('./webpack/config')

module.exports = function preprocessGraphQL() {
  return {
    async script({ content }) {
      const tree = acorn.parse(content, { sourceType: 'module', ecmaVersion: '2020' })
      let start, end

      walk.simple(tree, {
        VariableDeclaration(node) {
          const [declaration] = node.declarations
          if (declaration.id.name === 'query') {
            start = declaration.init.start
            end = declaration.init.end
          }
        },
      })

      if (!start) return { code: content }

      const query = content.slice(start, end)

      let data
      try {
        data = await request(`http://localhost:${PORT}/___graphql`, query.slice(1, -1))
      } catch (error) {
        throw new Error(`There was an error requesting data\n${error}`)
      }

      return { code: content.replace(query, JSON.stringify(data)) }
    },
  }
}
