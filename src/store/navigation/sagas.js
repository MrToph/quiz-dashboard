import { call, put, takeLatest } from 'redux-saga/effects'
import ActionTypes, * as actions from './actions'

import { authenticate } from '../../api'
import { authUser } from '../../api/libs/awsLib'

export function* appStart() {
  try {
    const isAuthenticated = yield call(authUser)
    if (!isAuthenticated) {
      throw new Error('User not authenticated. No session stored.')
    }
    yield put(actions.userLoginSuccess(isAuthenticated))
  } catch (e) {
    yield put(actions.userLoginError(e))
  }
}

export function* watchAppStart() {
  yield takeLatest(ActionTypes.appStarted, appStart)
}

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

export default [watchAppStart, watchUserLogin]
