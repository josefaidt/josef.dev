---
title: Prototyping Features with TypeScript's Module Augmentation
description: Learn how to prototype features with TypeScript's module augmentation
tags: ["typescript"]
publishDate: 2024-05-31
isFeatured: true
isArchived: false
---

Working on the more product-oriented side of engineering, writing code snippets in markdown or a text editor doesn't quite give you a sense for the ergonomics of an API and how it ties into the rest of the system (plus a lack of auto-complete and formatting). TypeScript, however, has this neat feature that allows you to _augment_ a module. It enables you to author types that either override existing functions or types, or extend the module with new functions or types.

TypeScript has a concept of ["declaration merging"](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

> “declaration merging” means that the compiler merges two separate declarations declared with the same name into a single definition

When prototyping new features, we'd want to build on top of the existing package from npm, which are published as JavaScript.

> Although JavaScript modules do not support [declaration] merging, you can patch existing objects by importing and then updating them.

This is where the concept of ["module augmentation"](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) comes in to play. Install the existing package from npm, then build on top.

In its simplest form, say we have the following project structure:

```tree
my-package/
├── mod.d.ts
├── package.json
├── take-one.ts
└── tsconfig.json
```
