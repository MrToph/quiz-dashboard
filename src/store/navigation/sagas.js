import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import ActionTypes, * as actions from './actions'

import { authenticate, signup } from '../../api'


// worker Saga: will be fired onActionTypes.userLoginStart actions
export function* userLogin(action) {
  try {
    const { username, password } = action.payload
    const apiToken = yield call(authenticate, username, password)
    yield put(actions.userLoginSuccess(apiToken))
  } catch (e) {
    yield put(actions.userLoginError(e))
  }
}

/*
  Does not allow concurrent fetches of user. If ActionTypes.userLoginStart gets
  dispatched while another one is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchUserLogin() {
  yield takeLatest(ActionTypes.userLoginStart, userLogin)
}

// will be fired on ActionTypes.userSignupStart actions
export function* userSignup(action) {
  try {
    const { username, password, email } = action.payload
    const user = yield call(signup, username, password, email)
    yield put(actions.userSignupSuccess(user))
  } catch (e) {
    yield put(actions.userSignupError(e))
  }
}

export function* watchUserSignup() {
  yield takeLatest(ActionTypes.userSignupStart, userSignup)
}
