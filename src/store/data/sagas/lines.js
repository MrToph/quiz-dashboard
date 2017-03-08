import { call, put, takeLatest, select } from 'redux-saga/effects'
import ActionTypes, * as actions from '../actions/lines'
import { selectAuthToken } from '../../selectors'

import { getLine, getLines, createLines, updateLine, deleteLine } from '../../../api'

export function* lineFetch(action) {
  try {
    const { id } = action.payload
    const jwtToken = yield select(selectAuthToken)
    const line = yield call(getLine, jwtToken, id)
    yield put(actions.lineSingleFetchLoadSuccess(line))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* linesFetch() {
  try {
    const jwtToken = yield select(selectAuthToken)
    const lines = yield call(getLines, jwtToken)
    yield put(actions.linesFetchLoadSuccess(lines))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* linesCreate(action) {
  try {
    const line = action.payload
    const jwtToken = yield select(selectAuthToken)
    const lineWidthId = yield call(createLines, jwtToken, line)
    yield put(actions.linesCreateSuccess(lineWidthId))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* lineUpdate(action) {
  try {
    const line = action.payload
    const jwtToken = yield select(selectAuthToken)
    yield call(updateLine, jwtToken, line)
    yield put(actions.linesUpdateSuccess(line))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* lineDelete(action) {
  try {
    const { id } = action.payload
    const jwtToken = yield select(selectAuthToken)
    yield call(deleteLine, jwtToken, id)
    yield put(actions.linesDeleteSuccess(id))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* watchLineFetch() {
  yield takeLatest(ActionTypes.lineSingleFetchStart, lineFetch)
}

export function* watchLinesFetch() {
  yield takeLatest(ActionTypes.linesFetchStart, linesFetch)
}

export function* watchLinesCreate() {
  yield takeLatest(ActionTypes.linesCreateStart, linesCreate)
}

export function* watchLineUpdate() {
  yield takeLatest(ActionTypes.linesUpdateStart, lineUpdate)
}

export function* watchLineDelete() {
  yield takeLatest(ActionTypes.linesDeleteStart, lineDelete)
}

// Export watchers as default export in an array
export default [watchLineFetch, watchLinesFetch, watchLinesCreate, watchLineUpdate, watchLineDelete]
