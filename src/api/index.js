import { parseAndHandleErrors, configurePostOptions, url } from './helpers'

export function authenticate(user, password) {
  const headers = configurePostOptions()
  const body = {
    name: user,
    password,
  }
  return fetch(`${url}/authenticate`, {
    ...headers,
    body: JSON.stringify(body), // need to convert to JSON
  })
  .then(parseAndHandleErrors)
  .then(response => response.token)
}

export function signup(user, password, email) {
  const headers = configurePostOptions()
  const body = {
    name: user,
    password,
    email,
  }
  return fetch(`${url}/signup`, {
    ...headers,
    body: JSON.stringify(body),
  })
  .then(parseAndHandleErrors)
}

export * from './artists'
export * from './lines'
