---
title: Proxy Requests in Vercel
description: Quick note to demonstrate how to proxy requests using Vercel's Micro HTTP framework
date: 2021-10-12
tags: ['backend', 'serverless']
published: true
---

- [npm:micro](https://www.npmjs.com/package/micro)

When building a single-endpoint microservice often times we find ourselves needing only a subset of the request object. In this example, `headers` and `body` are the only necessary properties needed from the incoming request. Under the context of a service written with `micro`, endpoints typically look something like the following:

```js
// index.js
export default function (request, response) {
  return `Hello, World!`
}
```

The familiarity of [Express.js](https://expressjs.com/) is present, and now we need a way to re-shape this `request` to include only the properties we need.

```js
// proxy.js
import { json } from 'micro'

export function proxiedRequest(handler) {
  return async function (request, response) {
    const proxied = {
      headers: request.headers,
      body: {},
    }
    if (request.method === 'POST') {
      proxied.body = await json(request)
    }
    return handler(proxied, response)
  }
}
```

Which enables us to directly consume the request body without parsing first. We can think of this as a JSON body parsing middleware, but it also helps shape the request the way we want to consume it. The handler can then be modified:

```js
// index.js
import { proxiedRequest } from './proxy.js'

export default proxiedRequest(function (request, response)) {
  return `Hello, ${request.body.name ?? 'World'}!`
}
```
