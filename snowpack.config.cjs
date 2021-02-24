const path = require('path')
const pkg = require(path.join(__dirname, 'package.json'))
const port = process.env.PORT ? process.env.PORT : (process.env.PORT = 3000) && 3000

module.exports = {
  // extends: '@sveltejs/snowpack-config',
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
        configFilePath: path.join(__dirname, 'svelte.config.cjs'),
        // preprocess: [
        //   require('svelte-preprocess')({
        //     postcss: {
        //       plugins: [require('autoprefixer')()],
        //     },
        //   }),
        //   require('./support/svelte-preprocess-gql')(),
        // ],
      },
    ],
    ['./support/snowpack-plugin-gql', {}],
  ],
  devOptions: {
    port,
    open: 'none',
    output: 'stream',
  },
  buildOptions: {
    sourcemap: true,
  },
  mount: {
    '.svelte/assets': `/${process.env.SVELTE_KIT_APP_DIR}/assets`,
    'src/components': '/_components',
    'src/styles': '/styles',
    'src/hooks': '/_hooks',
    content: '/_content',
  },
  alias: {
    $app: './.svelte/assets/runtime/app',
    $components: path.join(__dirname, 'src/components'),
    $hooks: path.join(__dirname, 'src/hooks'),
    $icons: path.join(__dirname, 'src/components/icons'),
    $layouts: './src/layouts',
  },
}
