---
title: 'Authenticating Svelte-Kit endpoints with Auth0'
description: 'Notes on authenticating API endpoints in Svelte-Kit with Auth0'
date: 2021-12-09
tags: ['serverless', 'svelte-kit', 'auth0']
published: false
---

References:

- [Auth0 Community Forums Answer](https://community.auth0.com/t/gettokensilently-returns-a-32-character-string-not-jwt/34294/2)
- [Auth0 AWS Custom Authorizer example on GitHub](https://github.com/auth0-samples/jwt-rsa-aws-custom-authorizer/blob/master/lib.js)
- Auth0 API Dashboard Node.js Example

Continuing the [last post](./svelte-kit-planetscale-and-prisma-on-vercel) -- for context -- we have a working Svelte-Kit app on Vercel with an API backed by Prisma and PlanetScale, but now we want to authenticate our Svelte-Kit endpoints.

There were a few findings I thought were notable while I was adding authentication:

- we need to specify an `audience` when creating the Auth0 client in order to generate the JWT when calling `client.getTokenSilently()`
- we need to create an API in Auth0 in order to generate an issuer and JWKS URI in addition to the `audience` in order to authenticate requests on the server side (our endpoints)

With that, we will need three new environment variables to use within the app:

```text
# .env
AUTH_DOMAIN=<tenant>.auth0.com
AUTH_CLIENT_ID=<client_id>
AUTH_AUDIENCE=http://localhost:3000/api # assumes we are writing endpoints in `src/routes/api`
AUTH_JWKS_URI=https://<tenant>.auth0.com/.well-known/jwks.json
AUTH_TOKEN_ISSUER=https://<tenant>.auth0.com/

# expose to the client by prefixing with "VITE_"
VITE_AUTH_DOMAIN=${AUTH_DOMAIN}
VITE_AUTH_CLIENT_ID=${AUTH_CLIENT_ID}
VITE_AUTH_AUDIENCE=${VALR_AUTH_AUDIENCE}
```

By exposing certain auth variables to the client we can access on `import.meta.env`:

```js
import createAuth0Client from '@auth0/auth0-spa-js'

/**
 * Creates Auth0 client
 * @returns {import('@auth0/auth0-spa-js').Auth0Client}
 */
async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH_AUDIENCE,
  })

  return auth0Client
}
```

And a sample API call to `/api/player.json` with the JWT:

```js
import { onMount } from 'svelte'

let client
let data

onMount(async () => {
  client = await auth.createClient()
})

async function callAPI() {
  try {
    data = await (
      await fetch('/api/players.json', {
        headers: {
          Authorization: `Bearer ${await client.getTokenSilently()}`,
        },
      })
    ).json()
  } catch (error) {
    console.error('Error fetching player data')
  }
}
```

For our Svelte-Kit endpoints we can access secrets on `process.env` and create a helper as follows:

```js
// src/routes/api/_verify.js
import { promisify } from 'util'
import jwksClient from 'jwks-rsa'
import jwt from 'jsonwebtoken'

export async function isAuthenticated(request) {
  const token = request.headers['authorization']?.match(/^Bearer (?<token>.*)$/)
    ?.groups?.token
  if (!token) return false

  const decoded = jwt.decode(token, { complete: true })
  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error('Invalid token')
  }

  const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: process.env['AUTH_JWKS_URI'],
  })

  const jwtOptions = {
    audience: process.env['AUTH_AUDIENCE'],
    issuer: process.env['AUTH_TOKEN_ISSUER'],
  }

  const getSigningKey = promisify(client.getSigningKey)
  const key = await getSigningKey(decoded.header.kid)
  const signingKey = key.publicKey || key.rsaPublicKey

  return jwt.verify(token, signingKey, jwtOptions)
}
```

And update our endpoint to authenticate requests:

```js
// src/routes/api/players.json.js
import { prisma } from '$lib/prisma'
import { isAuthenticated } from './_verify'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
  if (!(await isAuthenticated(request))) {
    return {
      status: 401,
      body: {
        error: {
          message: 'Unauthorized',
        },
      },
    }
  }

  let players
  try {
    players = await prisma.player.findMany()
  } catch (error) {
    console.error('Request error', error)
    return {
      status: 500,
      body: {
        error: {
          message: error.message,
          clientVersion: error.clientVersion,
        },
      },
    }
  }

  if (players) {
    return {
      body: {
        players,
      },
    }
  }
}
```

Finally, when we attempt to call `callAPI()` within our app while logged in we will receive a response and if we were to navigate directly to `http://localhost:3000/api/players.json` we will receive an unauthenticated error response!
