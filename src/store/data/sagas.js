import { call, put, takeLatest, select } from 'redux-saga/effects'
import ActionTypes, * as actions from './actions'
import { selectAuthToken } from '../selectors'

import { getArtists, createArtists } from '../../api'

/* ************* */
/* ** ARTISTS ** */
/* ************* */
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

export function* watchArtistsFetch() {
  yield takeLatest(ActionTypes.artistsFetchStart, artistsFetch)
}

export function* watchArtistsCreate() {
  yield takeLatest(ActionTypes.artistsCreateStart, artistsCreate)
}

// Export watchers as default export in an array
export default [watchArtistsFetch, watchArtistsCreate]
