---
title: 'New Features in Express FS Router'
description: 'Adding middleware support and HTTP method file-system routing to the Express FileSystem Router'
date: 2020-06-01
tags: ['javascript', 'tooling', 'thoughts']
published: true
---

![Roller Coaster - Photo by Priscilla Du Preez on Unsplash](./priscilla-du-preez-FOsina4f7qM-unsplash.jpg)

In my [last post](https://josefaidt.dev/blog/2020/04/express-filesystem-routing/) I talked about replicating Vercel's file-system routing for Express, and the reasoning behind the motivation.

For this iteration of [express-fs-router](https://www.npmjs.com/package/express-fs-router) there are two new notable features:

1. Middleware support
2. file-system based HTTP method routing (i.e. "methods routing")

I took some time away from the package to think about how I would like to design and implement middleware support. To align with the rest of the routing utility I wanted the developer experience to be straightforward and extremely approachable. Before diving into the solution, let's take a look at what middleware is and the apparent challenges with the existing codebase.

## Middleware

First, middleware is a term used to describe modular pieces of logic that runs before the execution of the endpoint handler. Think of it as a single function or a collection of functions that are chained together in order of execution before ultimately executing the defined handler. It sits in the "middle".

What does this look like in Express?

```js
// index.js
import express from 'express'
const app = express()

function myMiddleware(req, res, next) {
  console.log('hello from my middleware!')
  next()
}

app.get('/hello', myMiddleware, function (req, res) {
  res.json({ message: `Hello, ${req.query.name ?? 'World'}` })
})

app.listen(3000)
```

As you may have noticed the middleware function takes a third argument, `next`, and this is used to continue or go to the _next_ function. Remember these functions are executed in the order they are added to the route. Middleware can be used for a lot of additional functionalities such as authentication, body parsing, and uploading a file.

For adding this support to `express-fs-router` &mdash; where routes respective files export a function &mdash; we needed a way to export a _collection_ of functions where the order is preserved. What better way to do this than Arrays!

```js
// api/hello.js
function myMiddleware(req, res, next) {
  console.log('hello from my middleware!')
  next()
}

// our handler
function get(req, res) {
  res.json({ message: `Hello, ${req.query.name ?? 'World'}` })
}

export default [myMiddleware, get]
```

## Existing Codebase Challenges

Before I started working on this feature the existing codebase was only expecting function exports and solving the remainder of the routing logic for us. One of the quirks with adding middleware via Arrays is that Arrays are not a primitive type in JavaScript, so if we try to check with `typeof` we're going to expect `object` to come back. Thanks to a handy Array method, `isArray` we can ensure what the utility will attempt to work with is in fact an Array.

The skeleton code looks something like this:

```js
// express-fs-router/index.js
switch (typeof handler) {
  case 'function': {
    // export default function(req, res) {}
  }
  case 'object': {
    if (Array.isArray(handler) && handler.length) {
      // export default [function(req, res, next) {}, function(req, res) {}]
    }
  }
}
```

From here the logic is as straightforward as the existing `function` check, but we will be expecting the handler to be at the last position in the array:

```js
// express-fs-router/index.js
switch (typeof handler) {
  case 'function': {
    // export default function(req, res) {}
  }
  case 'object': {
    if (Array.isArray(handler) && handler.length) {
      // export default [function(req, res, next) {}, function(req, res) {}]
      // get HTTP method from handler function name
      if (!method) method = handler[handler.length - 1].name
      // set to router
      router[method](route, ...handler)
    }
  }
}
```

**Disclaimer** this pseudo-code is to display the design of the new feature's implementation, for more details be sure to check out [the source code](https://github.com/josefaidt/express-fs-router/blob/master/packages/express-fs-router/index.js#L147-L172).

And that's it! Middleware support is now fully functional for the Express routing utility. This next feature caused me to come back and refactor middleware support a little bit, but all for the better of the utility.

## Methods Routing

Not only can a user define what HTTP method a route should use via the function name, but now developers are enabled to create a directory with files using the naming convention `:method`; e.g. `:get`, `:post`:

```text
|- api/
  |- methods/
    |- :get.js
    |- :post.js
    |- :put.js
    |- :delete.js
```

The implementation here was sort of challenging, and I learned that Express _will_ add duplicate routes to the router, though it will only use the first handler added when called upon. Weird right? No problem, though, thankfully the router has a list of existing routes to check against. If we have a variable `route` that is derived from the relative file path we can verify whether a route already exists in Express Router:

```js
// express-fs-router/index.js#L89
router.stack.some(layer => layer.route.path === route)
```

Past that there are a series of additional checks because the route can already exist, we just need to be sure we do not have clashing HTTP method files, or other files such as `/api/methods/index.js` and `/api/methods.js` that would potentially cause issues with routes added.

```js
// express-fs-router/index.js#L90-L110
const existing = router.stack.find(layer => layer.route.path === route)
if (!method && (!handler?.name || handler?.name === 'all')) {
  // ensure an anonymous function with similar naming does not trump file-based methods (i.e. /methods/:get.js vs /methods.js)
  console.warn(
    `[FS-ROUTER] Duplicate entry detected: ${route} with implied method ALL. Consider deleting ${directory}/${path}.js. Skipping...`
  )
  continue
} else if (!method && Object.keys(existing.route.methods).length) {
  // don't allow users to add top-level `methods.js` with handler name of `put` and add to route with existing records'
  console.warn(
    `[FS-ROUTER] Duplicate entry detected: ${route} where file-system methods routes are enabled. Consider deleting ${directory}/${path}.js. Skipping...`
  )
  continue
} else if (Object.keys(existing.route.methods).includes(method || handler?.name)) {
  // warn user of duplicate entries for same route and method
  console.warn(
    `[FS-ROUTER] Duplicate entry detected: ${route} with method ${
      method || handler?.name
    }. Consider deleting ${directory}/${path}.js. Skipping...`
  )
  continue
}
```

And there we have it! Now the developer is notified when they (accidentally) attempt to add files that would potentially cause issues, and those files are bypassed (i.e. not be processed nor added to the Express Router).

## Closing Thoughts

These two new features were previously thought to be a bit ambitious and opinionated, but then again file-system routing is opinionated to begin with. Though the implementation came with a set of unique challenges &ndash; and other than pushing a completely broken build to npm &ndash; I think the features came out quite nicely.

For my next trick I will explore the ability to retrieve the file path of where `new FSRouter()` is invoked, allowing users to always get away with passing a relative directory to the constructor.
