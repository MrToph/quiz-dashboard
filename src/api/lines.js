import { invokeApig } from './libs/awsLib'

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

export function judgeLine(id, acceptLine) {
  try {
    const body = {
      acceptLine,
    }
    return invokeApig({
      path: `/judgeLine/${id}`,
      method: 'POST',
      body,
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function scrapePopularLines(artistNames, numberOfSongsToParse) {
  try {
    const body = {
      artistNames,
      numberOfSongsToParse,
    }
    return invokeApig({
      path: '/scrape/popular',
      method: 'POST',
      body,
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export function scrapeNewLines(artistNames, timestampToParseFrom) {
  try {
    const body = {
      artistNames,
      timestampToParseFrom,
    }
    return invokeApig({
      path: '/scrape/date',
      method: 'POST',
      body,
    })
  } catch (e) {
    return Promise.reject(e)
  }
}
