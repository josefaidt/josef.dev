/**
 * @param {{
 *   headers: Record<string, string>
 * }} incoming
 * @returns {Promise<{
 *   headers?: Record<string, string>
 *   context?: any
 * }>}
 */
export async function prepare() {
  return {
    context: {
      api: 'http://localhost:3000/___graphql',
    },
  }
}
