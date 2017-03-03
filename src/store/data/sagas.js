import { call, put, takeLatest, select } from 'redux-saga/effects'
import ActionTypes, * as actions from './actions'
import { selectAuthToken } from '../selectors'

import { getArtist, getArtists, createArtists, updateArtist } from '../../api'

/* ************* */
/* ** ARTISTS ** */
/* ************* */
export function* artistFetch(action) {
  try {
    const { name } = action.payload
    const jwtToken = yield select(selectAuthToken)
    const artist = yield call(getArtist, jwtToken, name)
    yield put(actions.artistSingleFetchLoadSuccess(artist))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* artistsFetch() {
  try {
    const jwtToken = yield select(selectAuthToken)
    const artists = yield call(getArtists, jwtToken)
    yield put(actions.artistsFetchLoadSuccess(artists))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* artistsCreate(action) {
  try {
    const { name, url } = action.payload
    const jwtToken = yield select(selectAuthToken)
    yield call(createArtists, jwtToken, name, url)
    yield put(actions.artistsCreateSuccess(name, url))
  } catch (e) {
    yield put(actions.artistsFetchError(e))
  }
}

export function* artistUpdate(action) {
  try {
    const { oldName, name, url } = action.payload
    const jwtToken = yield select(selectAuthToken)
    yield call(updateArtist, jwtToken, oldName, name, url)
    yield put(actions.artistUpdateSuccess(oldName, name, url))
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

// Export watchers as default export in an array
export default [watchArtistFetch, watchArtistsFetch, watchArtistsCreate, watchArtistUpdate]
