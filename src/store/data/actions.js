// import { isProduction } from '../../utils'

var ActionTypes = { // eslint-disable-line
  artistsFetchStart: 'ARTISTS_FETCH_START',
  artistsFetchLoadSuccess: 'ARTISTS_FETCH_LOAD_SUCCESS',
  artistsFetchError: 'ARTISTS_FETCH_ERROR',
  artistsCreateStart: 'ARTISTS_CREATE_START',
  artistsCreateSuccess: 'ARTISTS_CREATE_SUCCESS',
}

export default ActionTypes

export const artistsFetchStart = () => ({
  type: ActionTypes.artistsFetchStart,
})

export const artistsFetchLoadSuccess = artists => ({
  type: ActionTypes.artistsFetchLoadSuccess,
  payload: {
    artists,
  },
})

export const artistsFetchError = error => ({
  type: ActionTypes.artistsFetchError,
  payload: error,
})

export const artistsCreateStart = (name, url) => ({
  type: ActionTypes.artistsCreateStart,
  payload: {
    name,
    url,
  },
})

export const artistsCreateSuccess = (name, url) => ({
  type: ActionTypes.artistsCreateSuccess,
  payload: {
    name,
    url,
  },
})
