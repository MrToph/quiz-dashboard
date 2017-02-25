import ApiError from './Error'
import { isProduction } from '../utils'

export const url = isProduction() ? 'https://heroku.com/TODO' : 'http://localhost:3001/api'

function parseAndHandleErrors(response) {
  if (response.ok) {
    return response.json()
  }
  return response.json()
    .then((obj) => {
      throw new ApiError(null, obj.errors)
    })
}

function configurePostOptions(apiToken) {
  const headers = new Headers()
  // headers.append('Authorization', `JWT ${apiToken}`)
  headers.append('Content-Type', 'application/json')
  return {
    method: 'POST',
    headers,
  }
}

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
