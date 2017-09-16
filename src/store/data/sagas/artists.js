import { call, put, takeLatest, select } from 'redux-saga/effects'
import ActionTypes, * as actions from '../actions/artists'
import { selectAuthToken } from '../../selectors'

import {
  getArtist,
  getArtists,
  createArtists,
  updateArtist,
  deleteArtist,
} from '../../../api'

export function* artistFetch(action) {
  try {
    const { name } = action.payload
    const artist = yield call(getArtist, name)
    yield put(actions.artistSingleFetchLoadSuccess(artist))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* artistsFetch() {
  try {
    const artists = yield call(getArtists)
    yield put(actions.artistsFetchLoadSuccess(artists))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* artistsCreate(action) {
  try {
    const { name, url } = action.payload
    yield call(createArtists, name, url)
    yield put(actions.artistsCreateSuccess(name, url))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* artistUpdate(action) {
  try {
    const { oldName, url } = action.payload
    yield call(updateArtist, oldName, url)
    yield put(actions.artistUpdateSuccess(oldName, name, url))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* artistDelete(action) {
  try {
    const { name } = action.payload
    yield call(deleteArtist, name)
    yield put(actions.artistDeleteSuccess(name))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* watchArtistFetch() {
  yield takeLatest(ActionTypes.artistSingleFetchStart, artistFetch)
}

export function* watchArtistsFetch() {
  yield takeLatest(ActionTypes.artistsFetchStart, artistsFetch)
}

export function* watchArtistsCreate() {
  yield takeLatest(ActionTypes.artistsCreateStart, artistsCreate)
}

export function* watchArtistUpdate() {
  yield takeLatest(ActionTypes.artistUpdateStart, artistUpdate)
}

export function* watchArtistDelete() {
  yield takeLatest(ActionTypes.artistDeleteStart, artistDelete)
}

// Export watchers as default export in an array
export default [
  watchArtistFetch,
  watchArtistsFetch,
  watchArtistsCreate,
  watchArtistUpdate,
  watchArtistDelete,
]
