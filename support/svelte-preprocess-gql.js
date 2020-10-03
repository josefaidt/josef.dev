const acorn = require('acorn')
const walk = require('acorn-walk')
const { request } = require('graphql-request')

const PORT = process.env.PORT || 3000

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

      const code = content.slice(start, end)
      const evaluated = eval(code)

      let data
      try {
        let query = ``
        let vars = {}
        if (Array.isArray(evaluated)) {
          ;[query, vars] = evaluated
        } else query = evaluated

        data = await request(`http://localhost:${PORT}/___graphql`, query, vars)
      } catch (error) {
        throw new Error(`There was an error requesting data\n${error}`)
      }

      return { code: content.replace(code, JSON.stringify(data)) }
    },
  }
}
