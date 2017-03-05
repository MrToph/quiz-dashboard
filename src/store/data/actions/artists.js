// import { isProduction } from '../../utils'

var ActionTypes = { // eslint-disable-line
  artistsFetchStart: 'ARTISTS_FETCH_START',
  artistSingleFetchStart: 'ARTISTS_SINGLE_FETCH_START',
  artistsFetchLoadSuccess: 'ARTISTS_FETCH_LOAD_SUCCESS',
  artistSingleFetchLoadSuccess: 'ARTISTS_SINGLE_FETCH_LOAD_SUCCESS',
  artistsFetchError: 'ARTISTS_FETCH_ERROR',
  artistsCreateStart: 'ARTISTS_CREATE_START',
  artistsCreateSuccess: 'ARTISTS_CREATE_SUCCESS',
  artistUpdateStart: 'ARTIST_UPDATE_START',
  artistUpdateSuccess: 'ARTIST_UPDATE_SUCCESS',
  artistDeleteStart: 'ARTIST_DELETE_START',
  artistDeleteSuccess: 'ARTIST_DELETE_SUCCESS',
}

export default ActionTypes

export const artistsFetchStart = () => ({
  type: ActionTypes.artistsFetchStart,
})

export const artistSingleFetchStart = name => ({
  type: ActionTypes.artistSingleFetchStart,
  payload: {
    name,
  },
})

export const artistsFetchLoadSuccess = artists => ({
  type: ActionTypes.artistsFetchLoadSuccess,
  payload: {
    artists,
  },
})

export const artistSingleFetchLoadSuccess = artist => ({
  type: ActionTypes.artistSingleFetchLoadSuccess,
  payload: {
    artist,
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

export const artistUpdateStart = (oldName, name, url) => ({
  type: ActionTypes.artistUpdateStart,
  payload: {
    oldName,
    name,
    url,
  },
})

export const artistUpdateSuccess = (oldName, name, url) => ({
  type: ActionTypes.artistUpdateSuccess,
  payload: {
    oldName,
    name,
    url,
  },
})

export const artistDeleteStart = name => ({
  type: ActionTypes.artistDeleteStart,
  payload: {
    name,
  },
})


export const artistDeleteSuccess = name => ({
  type: ActionTypes.artistDeleteSuccess,
  payload: {
    name,
  },
})
