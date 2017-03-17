// import { isProduction } from '../../utils'

var ActionTypes = { // eslint-disable-line
  linesFetchStart: 'LINES_FETCH_START',
  lineSingleFetchStart: 'LINES_SINGLE_FETCH_START',
  linesFetchLoadSuccess: 'LINES_FETCH_LOAD_SUCCESS',
  lineSingleFetchLoadSuccess: 'LINES_SINGLE_FETCH_LOAD_SUCCESS',
  linesFetchError: 'LINES_FETCH_ERROR',
  linesCreateStart: 'LINES_CREATE_START',
  linesCreateSuccess: 'LINES_CREATE_SUCCESS',
  lineUpdateStart: 'LINE_UPDATE_START',
  lineUpdateSuccess: 'LINE_UPDATE_SUCCESS',
  lineDeleteStart: 'LINE_DELETE_START',
  lineDeleteSuccess: 'LINE_DELETE_SUCCESS',
}

export default ActionTypes

export const linesFetchStart = (lineStatus, isInitial = false) => ({
  type: ActionTypes.linesFetchStart,
  payload: {
    lineStatus: !!lineStatus,
    isInitial,
  },
})

export const lineSingleFetchStart = id => ({
  type: ActionTypes.lineSingleFetchStart,
  payload: {
    id,
  },
})

export const linesFetchLoadSuccess = (lines, isInitial) => ({
  type: ActionTypes.linesFetchLoadSuccess,
  payload: {
    lines,
    isInitial,
  },
})

export const lineSingleFetchLoadSuccess = line => ({
  type: ActionTypes.lineSingleFetchLoadSuccess,
  payload: {
    line,
  },
})

export const linesFetchError = error => ({
  type: ActionTypes.linesFetchError,
  payload: error,
})

export const linesCreateStart = (text, artist, songTitle, album, language, url, active) => ({
  type: ActionTypes.linesCreateStart,
  payload: {
    text,
    artist,
    songTitle,
    album,
    language,
    moreUrl: url,
    active: !!active,
  },
})

export const linesCreateSuccess = payload => ({
  type: ActionTypes.linesCreateSuccess,
  payload: {
    ...payload,
    active: !!payload.active,
  },
})

export const lineUpdateStart = (id, text, artist, songTitle, album, language, url, active) => ({
  type: ActionTypes.lineUpdateStart,
  payload: {
    id,
    text,
    artist,
    songTitle,
    album,
    language,
    moreUrl: url,
    active: !!active,
  },
})

export const lineUpdateSuccess = payload => ({
  type: ActionTypes.lineUpdateSuccess,
  payload: {
    ...payload,
    active: !!payload.active,
  },
})

export const lineDeleteStart = id => ({
  type: ActionTypes.lineDeleteStart,
  payload: {
    id,
  },
})


export const lineDeleteSuccess = id => ({
  type: ActionTypes.lineDeleteSuccess,
  payload: {
    id,
  },
})
