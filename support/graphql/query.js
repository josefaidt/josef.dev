import { request } from 'graphql-request'

export default async function query(query, vars) {
  try {
    await request('/___graphql', query, vars)
  } catch (error) {
    throw error
  }
}
