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

export const lineSingleFetchStart = name => ({
  type: ActionTypes.lineSingleFetchStart,
  payload: {
    name,
  },
})

export const linesFetchLoadSuccess = lines => ({
  type: ActionTypes.linesFetchLoadSuccess,
  payload: {
    lines,
  },
})

export const lineSingleFetchLoadSuccess = lines => ({
  type: ActionTypes.lineSingleFetchLoadSuccess,
  payload: {
    lines,
  },
})

export const linesFetchError = error => ({
  type: ActionTypes.linesFetchError,
  payload: error,
})

export const linesCreateStart = (name, url) => ({
  type: ActionTypes.linesCreateStart,
  payload: {
    name,
    url,
  },
})

export const linesCreateSuccess = (name, url) => ({
  type: ActionTypes.linesCreateSuccess,
  payload: {
    name,
    url,
  },
})

export const linesUpdateStart = (oldName, name, url) => ({
  type: ActionTypes.linesUpdateStart,
  payload: {
    oldName,
    name,
    url,
  },
})

export const linesUpdateSuccess = (oldName, name, url) => ({
  type: ActionTypes.linesUpdateSuccess,
  payload: {
    oldName,
    name,
    url,
  },
})

export const linesDeleteStart = name => ({
  type: ActionTypes.linesDeleteStart,
  payload: {
    name,
  },
})


export const linesDeleteSuccess = name => ({
  type: ActionTypes.linesDeleteSuccess,
  payload: {
    name,
  },
})
