---
title: Replicating Vercel's File-System Routing for Express
description: "Documenting my experience with building npm:express-fs-router"
pubDate: 2020-04-27
tags: ["javascript", "tooling"]
isArchived: true
---

![PA Coal Power Plant - steam network - Photo by Martin Adams on Unsplash](https://user-images.githubusercontent.com/5033303/149253789-acbf6c1e-ac27-4bd6-8727-d4e8e437644d.jpg)

There is something magical about writing an API with Vercel's (previously known as ZEIT) API routing, where each file is an exposed route, and each file exports a default function that follows Express's handler nomenclature.

```js
export default function (req, res) {}
```

Since Vercel uses [micro](https://www.npmjs.com/package/micro) behind the scenes, adapting to Vercel's way of writing API routes where the Express familiarity is present makes micro much more approachable, but _micro_ isn't necessarily the framework of choice for most Node projects. In comes [express-fs-router](https://www.npmjs.com/package/express-fs-router), my latest package aimed at simplifying building API's with Express leveraging the file system.

## The Need

When talking about adding file-system routing to Express you might be asking yourself "but why?", and that's a valid question. With Express we can easily import its router, create the route, export the router, and then roll it up in the `routes.js` or `app.js` file with the Express app. But with file-system routing we align with what Vercel offers: export a default function (the handler) and the route now exists and is exposed.

## Benefits

At the surface, file-system routing introduces several benefits to the development experience:

- hot-load routes
- easier to document
- route modularity
- logical directory structure
- indirectly reduces time for onboarding

These benefits are a bit subjective, however building a utility like this I've found it's greatly improved my own velocity when building REST API's now that I no longer have to worry about adding the new route to the routes or app file; I hit save and it just works:tm:.

To highlight some of these benefits let's take a look at a sample endpoint:

```js
// api/hello.js
/**
 * Say hello to our caller
 *
 * @name SayHello
 * @path {GET} /api/hello
 * @query {String} [name] - Name of the caller
 *
 */
export default function (req, res) {
  res.json({ message: `Hello, ${req.query.name || "World"}!` })
}
```

As a developer we know that each file will export one handler, thus improving developer experience and ease of documentation, and in a sense reduces time for onboarding new developers to an existing codebase. Not only is the experience improved, but the modularity of our API is also drastically improved.

## Caveats

Enough with gushing over file-system routing. I know I may be a bit biased but let's take a look at some potential caveats &ndash; again, a bit subjective:

- unnecessary file system depth for smaller API's
- different concept of middleware application
- feeling of losing control over attached route methods

file-system routing isn't a new concept, but I can understand why some would choose to adopt a different strategy. Personally I liked the idea enough to replicate it for Express.

## express-fs-router

Noted earlier, [express-fs-router](https://www.npmjs.com/package/express-fs-router) is a utility I wrote to bring file-system routing to Express. It functions a lot like Vercel's API routes, but with a bit of added functionality.

### Features

- only attempts to import JavaScript files (ex: `index.js`)
- ignores JavaScript files prepended with an underscore (ex: `_utility.js`)
- functions named with a request method will attach that handler using the defined method

  ```js
  export default function get(req, res) {}
  ```

  is then added to the Express router as

  ```js
  router.get("/hello", handler)
  ```

  by default routes are added with ALL methods

  ```js
  router.all("/hello", function (req, res) {})
  ```

### Integration

Adding the file system router is relatively straightfoward, and can be added to any existing Express application:

```js
// app.js
import express from "express"
import FSRouter from "express-fs-router"
const app = express()

app.use("/api", new FSRouter("api"))

app.listen(3000, () => console.log("Listening at http://localhost:3000"))
```

## Closing Thoughts

Overall I had a ton of fun building and replicating functionality from other projects to ultimately bring this utility to JavaScript's seemingly-default choice for HTTP server frameworks, Express. If you're interested in seeing what goes on under the hood be sure to stop by the [GitHub Repository](https://github.com/josefaidt/express-fs-router). The project is still fairly recent and I'm sure I haven't covered every use case, so if you try it out and run into any issues please [submit an issue](https://github.com/josefaidt/express-fs-router/issues/new/choose) to help me improve the utility!
