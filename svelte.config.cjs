module.exports = {
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: '@sveltejs/adapter-static',

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
  preprocess: [require('svelte-preprocess')(), require('./support/svelte-preprocess-gql')()],
}