const path = require('path')
const pkg = require(path.join(process.cwd(), 'package.json'))
const port = process.env.PORT || 3000

// Consult https://www.snowpack.dev to learn about these options
// module.exports = {
//   port,
//   extends: '@sveltejs/snowpack-config',
//   mount: {
//     'src/components': '/_components',
//   },
//   alias: {
//     $components: './src/components',
//   },
//   routes: [{ src: '/___graphql', dest: handler }],
// }

// Consult https://www.snowpack.dev to learn about these options
module.exports = {
  // extends: '@sveltejs/snowpack-config',
  port,
  packageOptions: {
    // always include Svelte in your project
    knownEntrypoints: ['svelte'],
    // ignore `import fs from 'fs'` etc
    external: [...require('module').builtinModules, ...Object.keys(pkg.dependencies || {})],
  },
  plugins: [
    [
      '@snowpack/plugin-svelte',
      {
        compilerOptions: {
          hydratable: true,
        },
        configFilePath: 'svelte.config.cjs',
        // input: ['.svelte', '.svx'],
        // preprocess: require('./svelte.config.cjs').preprocess,
      },
    ],
    // [
    //   '@snowpack/plugin-build-script',
    //   {
    //     cmd: 'postcss',
    //     input: ['.css', '.pcss'],
    //     output: ['.css'],
    //   },
    // ],

    // ['./support/snowpack-plugin-mdsvex', {}],
    ['./support/snowpack-plugin-gql', {}],
  ],
  devOptions: {
    open: 'none',
    output: 'stream',
  },
  buildOptions: {
    sourcemap: true,
  },
  mount: {
    '.svelte/assets': `/${process.env.SVELTE_KIT_APP_DIR}/assets`,
    'src/components': '/_components',
  },
  alias: {
    $app: './.svelte/assets/runtime/app',
    $components: path.join(__dirname, 'src/components'),
    $icons: path.join(__dirname, 'src/components/icons'),
    $styles: path.join(__dirname, 'src/styles'),
    $layouts: './src/layouts',
  },
}
