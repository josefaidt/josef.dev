import { resolve } from 'path'

// not in use
const markdown = {
  rehypePlugins: [
    [
      'cloudinary', // replace with actual package, consider app-specific plugins
      {
        baseDir: resolve('content/posts'),
        uploadFolder: 'josef.dev',
        transformations: 'q_auto,f_auto',
      },
    ],
  ],
}

const app = {
  title: 'josef',
  url: 'https://josef.dev',
  description: 'Welcome to my personal site',
  keywords: ['josef', 'aidt', 'personal', 'portfolio', 'svelte'],
  author: 'Josef Aidt',
  handle: 'josefaidt',
  cloudinaryConfig: {
    baseDir: resolve('content/posts'),
    uploadFolder: 'josef.dev',
    transformations: 'q_auto,f_auto',
  },
}

export default app
