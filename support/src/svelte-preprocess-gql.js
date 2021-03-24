const acorn = require('acorn')
const walk = require('acorn-walk')
const { request } = require('graphql-request')

module.exports = function preprocessGraphQL() {
  return {
    async script({ content, attributes, filename }) {
      if (attributes.context && attributes.context === 'module') {
        const tree = acorn.parse(content, { sourceType: 'module', ecmaVersion: '2020' })
        let start, end

        walk.simple(tree, {
          ExportNamedDeclaration(node) {
            const { declaration: nodeDeclaration } = node
            if (
              nodeDeclaration.type === 'VariableDeclaration' &&
              nodeDeclaration.kind === 'const'
            ) {
              const [declaration] = nodeDeclaration.declarations
              if (declaration.id.name === 'query') {
                start = declaration.init.start
                end = declaration.init.end
              }
            }
          },
        })

        if (!start) return { code: content }

        const code = content.slice(start, end)
        const evaluated = eval(code)

        let data
        // try {
        //   let mod = await import(filename)
        //   console.log('MOD LOADED', mod)
        // } catch (error) {
        //   console.error('Unable to import file', filename)
        // }

        try {
          let query = ``
          let vars = {}
          if (Array.isArray(evaluated)) {
            ;[query, vars] = evaluated
          } else query = evaluated

          console.log('trying', query, vars)
          data = await request(`http://localhost:${3000}/___graphql`, query, vars)
        } catch (error) {
          throw new Error(`There was an error requesting data\n${error}`)
        }

        return { code: content.replace(code, JSON.stringify(data)) }
      } else return { code: content }
    },
  }
}
