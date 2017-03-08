// import { isProduction } from '../../utils'

var ActionTypes = { // eslint-disable-line
  linesFetchStart: 'LINES_FETCH_START',
  lineSingleFetchStart: 'LINES_SINGLE_FETCH_START',
  linesFetchLoadSuccess: 'LINES_FETCH_LOAD_SUCCESS',
  lineSingleFetchLoadSuccess: 'LINES_SINGLE_FETCH_LOAD_SUCCESS',
  linesFetchError: 'LINES_FETCH_ERROR',
  linesCreateStart: 'LINES_CREATE_START',
  linesCreateSuccess: 'LINES_CREATE_SUCCESS',
  linesUpdateStart: 'LINE_UPDATE_START',
  linesUpdateSuccess: 'LINE_UPDATE_SUCCESS',
  linesDeleteStart: 'LINE_DELETE_START',
  linesDeleteSuccess: 'LINE_DELETE_SUCCESS',
}

export default ActionTypes

export const linesFetchStart = () => ({
  type: ActionTypes.linesFetchStart,
})

export const lineSingleFetchStart = id => ({
  type: ActionTypes.lineSingleFetchStart,
  payload: {
    id,
  },
})

export const linesFetchLoadSuccess = lines => ({
  type: ActionTypes.linesFetchLoadSuccess,
  payload: {
    lines,
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

export const linesUpdateStart = (id, text, artist, songTitle, album, language, url, active) => ({
  type: ActionTypes.linesUpdateStart,
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

export const linesUpdateSuccess = payload => ({
  type: ActionTypes.linesUpdateSuccess,
  payload: {
    ...payload,
    active: !!payload.active,
  },
})

export const linesDeleteStart = id => ({
  type: ActionTypes.linesDeleteStart,
  payload: {
    id,
  },
})


export const linesDeleteSuccess = id => ({
  type: ActionTypes.linesDeleteSuccess,
  payload: {
    id,
  },
})
