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

function configureGetOptions(apiToken) {
  const headers = new Headers()
  if (apiToken) headers.append('Authorization', `${apiToken}`)
  headers.append('Content-Type', 'application/json')
  return {
    method: 'GET',
    headers,
  }
}

function configurePostOptions(apiToken) {
  const { headers } = configureGetOptions(apiToken)
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

export function getArtists(apiToken) {
  const headers = configureGetOptions(apiToken)
  return fetch(`${url}/artists`, {
    ...headers,
  })
  .then(parseAndHandleErrors)
  .then(response => response.artists.map(artist => ({
    name: artist.name,
    url: artist.url,
  })))
}

export function createArtists(apiToken, name, artistUrl) {
  const headers = configurePostOptions(apiToken)
  const body = {
    name,
    url: artistUrl,
  }
  return fetch(`${url}/artists`, {
    ...headers,
    body: JSON.stringify(body),
  })
  .then(parseAndHandleErrors)
}
