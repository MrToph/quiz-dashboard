import { parseAndHandleErrors, configureGetOptions, configurePostOptions,
  configurePatchOptions, configureDeleteOptions, url } from './helpers'

export function getArtist(apiToken, name) {
  const headers = configureGetOptions(apiToken)
  return fetch(`${url}/artists/${name}`, {
    ...headers,
  })
  .then(parseAndHandleErrors)
  .then(response => ({
    name: response.artist.name,
    url: response.artist.url,
  }))
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

export function updateArtist(apiToken, oldName, name, artistUrl) {
  const headers = configurePatchOptions(apiToken)
  const body = {
    name,
    url: artistUrl,
  }
  return fetch(`${url}/artists/${oldName}`, {
    ...headers,
    body: JSON.stringify(body),
  })
  .then(parseAndHandleErrors)
}

export function deleteArtist(apiToken, name) {
  const headers = configureDeleteOptions(apiToken)
  return fetch(`${url}/artists/${name}`, {
    ...headers,
  })
  .then(parseAndHandleErrors)
}
