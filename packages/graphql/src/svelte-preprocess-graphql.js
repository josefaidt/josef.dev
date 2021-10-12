import * as acorn from 'acorn'
import * as walk from 'acorn-walk'
import { default as request } from './query'

export function preprocessGraphQL() {
  return {
    async script({ content, attributes, filename }) {
      if (attributes.context && attributes.context === 'module') {
        const tree = acorn.parse(content, {
          sourceType: 'module',
          ecmaVersion: '2020',
        })
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
        try {
          let query = ``
          let vars = {}
          if (Array.isArray(evaluated)) {
            ;[query, vars] = evaluated
          } else query = evaluated

          data = await request(query, vars)
        } catch (error) {
          throw new Error(`There was an error requesting data\n${error}`)
          // console.log(
          //   'There was an error requesting data, is the GraphQL Layer running?',
          //   error.message
          // )
        }

        return { code: content.replace(code, JSON.stringify(data)) }
      } else return { code: content }
    },
  }
}
