import qparams from 'query-params'
import { parseAndHandleErrors, configureGetOptions, configurePostOptions,
  configurePatchOptions, configureDeleteOptions, url } from './helpers'

function extractLineFields(lineResponse) {
  return {
    id: lineResponse._id, // eslint-disable-line
    active: lineResponse.active,
    album: lineResponse.album,
    artist: lineResponse.artist,
    language: lineResponse.language,
    songTitle: lineResponse.songTitle,
    text: lineResponse.text,
    moreUrl: lineResponse.moreUrl,
  }
}

export function getLine(apiToken, id) {
  const headers = configureGetOptions(apiToken)
  return fetch(`${url}/lines/${id}`, {
    ...headers,
  })
  .then(parseAndHandleErrors)
  .then(response => extractLineFields(response.line))
}

export function getLines(apiToken, lineStatus, fromId) {
  const headers = configureGetOptions(apiToken)
  const params = {
    lineStatus: !!lineStatus,
    fromId: fromId || null,
  }
  return fetch(`${url}/lines?${qparams.encode(params)}`, {
    ...headers,
  })
  .then(parseAndHandleErrors)
  .then(response => response.lines.map(line => extractLineFields(line)))
}

export function createLines(apiToken, lineWithoutId) {
  const headers = configurePostOptions(apiToken)
  const body = lineWithoutId
  return fetch(`${url}/lines`, {
    ...headers,
    body: JSON.stringify(body),
  })
  .then(parseAndHandleErrors)
  .then(line => extractLineFields(line))
}

export function updateLine(apiToken, line) {
  const headers = configurePatchOptions(apiToken)
  const body = line
  return fetch(`${url}/lines/${line.id}`, {
    ...headers,
    body: JSON.stringify(body),
  })
  .then(parseAndHandleErrors)
}

export function deleteLine(apiToken, id) {
  const headers = configureDeleteOptions(apiToken)
  return fetch(`${url}/lines/${id}`, {
    ...headers,
  })
  .then(parseAndHandleErrors)
}

export function judgeLine(apiToken, id, acceptLine) {
  const headers = configurePostOptions(apiToken)
  const body = {
    acceptLine,
  }
  return fetch(`${url}/judgeLine/${id}`, {
    ...headers,
    body: JSON.stringify(body),
  })
  .then(parseAndHandleErrors)
}
