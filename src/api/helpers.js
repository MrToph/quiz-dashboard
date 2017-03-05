import ApiError from './Error'
import { isProduction } from '../utils'


export const url = isProduction() ? 'https://heroku.com/TODO' : 'http://localhost:3001/api'

export function parseAndHandleErrors(response) {
  if (response.ok) {
    return response.json()
  }
  return response.json()
    .then((obj) => {
      throw new ApiError(null, obj.errors)
    })
}

export function configureGetOptions(apiToken) {
  const headers = new Headers()
  if (apiToken) headers.append('Authorization', `${apiToken}`)
  headers.append('Content-Type', 'application/json')
  return {
    method: 'GET',
    headers,
  }
}

export function configurePostOptions(apiToken) {
  const { headers } = configureGetOptions(apiToken)
  return {
    method: 'POST',
    headers,
  }
}

export function configurePatchOptions(apiToken) {
  const { headers } = configureGetOptions(apiToken)
  return {
    method: 'PATCH',
    headers,
  }
}

export function configureDeleteOptions(apiToken) {
  const { headers } = configureGetOptions(apiToken)
  return {
    method: 'DELETE',
    headers,
  }
}
