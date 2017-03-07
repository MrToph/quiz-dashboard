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

export const linesCreateStart = payload => ({
  type: ActionTypes.linesCreateStart,
  payload: {
    ...payload,
    active: !!payload.active,
  },
})

export const linesCreateSuccess = payload => ({
  type: ActionTypes.linesCreateSuccess,
  payload: {
    ...payload,
    active: !!payload.active,
  },
})

export const linesUpdateStart = (id, payload) => ({
  type: ActionTypes.linesUpdateStart,
  payload: {
    ...payload,
    active: !!payload.active,
  },
})

export const linesUpdateSuccess = (id, payload) => ({
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
