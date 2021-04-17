/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ context }) {
  return {
    meta: {
      title: 'josef',
      url: 'https://josef.dev',
      description: 'Welcome to my personal site',
      keywords: ['josef', 'aidt', 'personal', 'portfolio', 'svelte'],
      author: 'josefaidt',
    }
  }
}
