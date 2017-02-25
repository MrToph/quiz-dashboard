import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import ActionTypes, * as actions from './actions'

import { authenticate } from '../../api'


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* userLogin(action) {
  try {
    const { username, password } = action.payload
    const user = yield call(authenticate, username, password)
    yield put(actions.userLoginSuccess(user))
  } catch (e) {
    yield put(actions.userLoginError(e))
  }
}

/*
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export function* watchUserLogin() {
  yield takeLatest(ActionTypes.userLoginStart, userLogin)
}
