---
title: Using ES Modules in your Browser Extension's Service Worker
description: Short note on how to use ES Modules in a browser extension's service worker
tags: ["javascript"]
publishDate: 2022-06-15
---

When developing a browser extension -- in this case a Chrome extension -- we may begin developing using the same ES Modules approach we've used in the frontend, but then are presented with an error along the lines of `Cannot use 'import.meta' outside a module`.

In the following diff we can use the JSON schema to find a `type` property we can use to specify the service worker is an ES Module. Note, `$schema` is not actually a valid manifest property and will throw a warning upon loading the extension, however in instances like this it is helpful.

```diff
{
  "$schema": "https://json.schemastore.org/chrome-manifest",
  "name": "My super cool extension",
  "description": "",
  "version": "0.1",
  "manifest_version": 3,
  "background": {
    "service_worker": "worker.js",
+   "type": "module"
  },
  "action": {
    "default_popup": "index.html"
  }
}
```

Now add the following to the `worker.js` file:

```js
console.log("import.meta.url is", import.meta.url)
```

And finally after loading the extension we can view the value of `import.meta.url` without error.

<img width="320" alt="image" src="https://user-images.githubusercontent.com/5033303/173837559-54991e3b-c36e-4935-a570-118b7e73eb27.png">
