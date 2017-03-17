import { call, put, takeLatest, select } from 'redux-saga/effects'
import ActionTypes, * as actions from '../actions/lines'
import { selectAuthToken, selectLatestLineId } from '../../selectors'

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

export function* linesFetch(action) {
  try {
    const { lineStatus, isInitial } = action.payload
    const jwtToken = yield select(selectAuthToken)
    const latestLineId = !isInitial ? yield select(selectLatestLineId, lineStatus) : false
    const lines = yield call(getLines, jwtToken, lineStatus, latestLineId)
    yield put(actions.linesFetchLoadSuccess(lines, isInitial))
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
    yield put(actions.lineUpdateSuccess(line))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* lineDelete(action) {
  try {
    const { id } = action.payload
    const jwtToken = yield select(selectAuthToken)
    yield call(deleteLine, jwtToken, id)
    yield put(actions.lineDeleteSuccess(id))
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
  yield takeLatest(ActionTypes.lineUpdateStart, lineUpdate)
}

export function* watchLineDelete() {
  yield takeLatest(ActionTypes.lineDeleteStart, lineDelete)
}

// Export watchers as default export in an array
export default [watchLineFetch, watchLinesFetch, watchLinesCreate, watchLineUpdate, watchLineDelete]
