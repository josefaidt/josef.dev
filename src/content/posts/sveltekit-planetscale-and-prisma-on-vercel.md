---
title: SvelteKit, PlanetScale, and Prisma on Vercel
description: "Notes on deploying SvelteKit, PlanetScale, and Prisma on Vercel"
publishDate: 2021-12-06
tags: ["serverless", "SvelteKit", "planetscale", "prisma", "vercel"]
isFeatured: true
---

References:

- [David Parks's "Deploying a PlanetScale, Next.js & Prisma App to Vercel"](https://davidparks.dev/blog/planetscale-deployment-with-prisma/)
- [PlanetScale GitHub Discussion's post on SSL error](https://github.com/planetscale/beta/discussions/82#discussioncomment-1225083)
- [Mike Nikles's GitHub repository for SvelteKit and Prisma](https://github.com/mikenikles/sveltekit-prisma/blob/main/package.json#L13)

Okay, say we have a working SvelteKit application locally with an endpoint that connects Prisma to our PlanetScale connection, we are able to run Prisma Studio and CRUD sample data, but are running into an issue deploying using the [SvelteKit Vercel adapter](https://www.npmjs.com/package/@sveltejs/adapter-vercel).

Using [David Parks's blog post as our starting example](https://davidparks.dev/blog/planetscale-deployment-with-prisma/), let's add a `Player` model to our Prisma schema:

```text
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider             = "mysql"
  url                  = env("DATABASE_URL")
  shadowDatabaseUrl    = env("SHADOW_DATABASE_URL")
  referentialIntegrity = "prisma"
}

model Player {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String   @db.VarChar(255)
}
```

Continuing the blog post mentioned above, we can run `prisma studio` and add a sample Player, successfully migrate the schema using `prisma migrate ...`, and merge changes to the primary branch of our PlanetScale database. Using the following two code snippets as an example, we can set up a Prisma client and SvelteKit endpoint to query our Players.

```js
// src/lib/prisma.js
import { PrismaClient } from "@prisma/client"

export let prisma
if (import.meta.env.PROD) {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
```

```js
// src/routes/api/players.json.js
import { prisma } from "$lib/prisma"

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
  let players
  try {
    players = await prisma.player.findMany()
  } catch (error) {
    console.error("Request error", error)
    return {
      status: 500,
      body: {
        error: {
          message: error.message,
          code: error.errorCode,
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

Now, _continuing_ the blog post we'll need to add a parameter to the MySQL connection string (thanks to the [PlanetScale GitHub Discussion comment](https://github.com/planetscale/beta/discussions/82#discussioncomment-1225083)): `sslaccept=strict`.

In the end, our `DATABASE_URL` environment variable in Vercel will end up looking as follows:

```text
mysql://<username>:<password>@<host-url>/<database-name>?sslmode=require&sslaccept=strict&ssclcert=/etc/pki/tls/certs/ca-bundle.crt
```

Finally, the last piece we'll need is necessary to copy the Prisma schema file and Prisma client engines' information to the location of the render function created by SvelteKit when we use the Vercel adapter. The following `package.json` snippet was derived from [this wonderful SvelteKit & Prisma repository by Mike Nikles](https://github.com/mikenikles/sveltekit-prisma/blob/main/package.json#L13):

```json
{
  "scripts": {
    // ...
    "vercel-postbuild": "cp node_modules/@prisma/engines/*query* .vercel_build_output/functions/node/render/;cp prisma/schema.prisma .vercel_build_output/functions/node/render/",
    "vercel-build": "prisma generate && pnpm build && pnpm vercel-postbuild"
  }
}
```

Two notes on the copy commands:

- without copying the schema we will encounter `ENOENT: no such file or directory, open '/var/task/schema.prisma'` when attempting to call the endpoint `/api/players.json`
- without copying the engine information we will encounter
  ```text
  Error: Query engine library for current platform "rhel-openssl-1.0.x" could not be found. You incorrectly pinned it to rhel-openssl-1.0.x This probably happens, because you built Prisma Client on a different platform.
  ```

Now we can deploy to Vercel and visit the URL of our SvelteKit endpoint (`/api/players.json`) to see the test player results!
