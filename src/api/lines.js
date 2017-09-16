import qparams from 'query-params'
import { invokeApig } from './libs/awsLib'
import {
  parseAndHandleErrors,
  configureGetOptions,
  configurePostOptions,
  configurePatchOptions,
  configureDeleteOptions,
  url,
} from './helpers'

function extractLineFields(lineResponse) {
  return {
    id: lineResponse.id,
    active: lineResponse.active,
    album: lineResponse.album,
    artist: lineResponse.artist,
    language: lineResponse.language,
    songTitle: lineResponse.songTitle,
    text: lineResponse.text,
    moreUrl: lineResponse.moreUrl,
    thumbnail: lineResponse.thumbnail,
  }
}

export function getLine(id) {
  try {
    return invokeApig({
      path: `/lines/${id}`,
      method: 'GET',
    }).then(line => extractLineFields(line))
  } catch (e) {
    return Promise.reject(e)
  }
}

export function getLines(lineStatus, fromId) {
  try {
    const queryParams = {
      lineStatus: !!lineStatus,
      fromId: fromId ? JSON.stringify(fromId) : '',
    }
    return invokeApig({
      path: '/lines',
      method: 'GET',
      queryParams,
    }).then(({ Items, LastEvaluatedKey }) => ({
      lines: Items.map(line => extractLineFields(line)),
      lastEvaluatedLineKey: LastEvaluatedKey,
    }))
  } catch (e) {
    return Promise.reject(e)
  }
}

export function createLines(lineWithoutId) {
  try {
    const body = lineWithoutId
    return invokeApig({
      path: '/lines',
      method: 'POST',
      body,
    }).then(line => extractLineFields(line))
  } catch (e) {
    return Promise.reject(e)
  }
}

export function updateLine(line) {
  try {
    const { id, ...lineWithoutId } = line
    const body = lineWithoutId
    return invokeApig({
      path: `/lines/${id}`,
      method: 'PUT',
      body,
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function deleteLine(id) {
  try {
    return invokeApig({
      path: `/lines/${id}`,
      method: 'DELETE',
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function judgeLine(apiToken, id, acceptLine) {
  const headers = configurePostOptions(apiToken)
  const body = {
    acceptLine,
  }
  return fetch(`${url}/judgeLine/${id}`, {
    ...headers,
    body: JSON.stringify(body),
  }).then(parseAndHandleErrors)
}

export function scrapePopularLines(
  apiToken,
  artistNames,
  numberOfSongsToParse,
) {
  const headers = configurePostOptions(apiToken)
  const body = {
    artistNames,
    numberOfSongsToParse,
  }
  return fetch(`${url}/scrape/popular`, {
    ...headers,
    body: JSON.stringify(body),
  }).then(parseAndHandleErrors)
}

export function scrapeNewLines(apiToken, artistNames, timestampToParseFrom) {
  const headers = configurePostOptions(apiToken)
  const body = {
    artistNames,
    timestampToParseFrom,
  }
  return fetch(`${url}/scrape/date`, {
    ...headers,
    body: JSON.stringify(body),
  }).then(parseAndHandleErrors)
}
