import { call, put, takeLatest, select } from 'redux-saga/effects'
import ActionTypes, * as actions from '../actions/lines'
import { selectAuthToken, selectLatestLineId } from '../../selectors'

import {
  getLine,
  getLines,
  createLines,
  updateLine,
  deleteLine,
  judgeLine,
  scrapePopularLines,
  scrapeNewLines,
} from '../../../api'

export function* lineFetch(action) {
  try {
    const { id } = action.payload
    const line = yield call(getLine, id)
    yield put(actions.lineSingleFetchLoadSuccess(line))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* linesFetch(action) {
  try {
    const { lineStatus, isInitial } = action.payload
    const latestLineId = !isInitial ? yield select(selectLatestLineId) : false
    const { lines, lastEvaluatedLineKey } = yield call(
      getLines,
      lineStatus,
      latestLineId,
    )
    yield put(
      actions.linesFetchLoadSuccess(lines, isInitial, lastEvaluatedLineKey),
    )
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* linesCreate(action) {
  try {
    const line = action.payload
    const lineWidthId = yield call(createLines, line)
    yield put(actions.linesCreateSuccess(lineWidthId))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* lineUpdate(action) {
  try {
    const line = action.payload
    yield call(updateLine, line)
    yield put(actions.lineUpdateSuccess(line))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* lineDelete(action) {
  try {
    const { id } = action.payload
    yield call(deleteLine, id)
    yield put(actions.lineDeleteSuccess(id))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* lineJudge(action) {
  try {
    const { id, acceptLine } = action.payload
    yield call(judgeLine, id, acceptLine)
    yield put(actions.lineJudgeSuccess(id, acceptLine))
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* scrapeLinesByPopularity(action) {
  try {
    const { artistNames, numberOfSongsToParse } = action.payload
    yield call(scrapePopularLines, artistNames, numberOfSongsToParse)
    yield put(
      actions.scrapeLinesByPopularitySuccess(artistNames, numberOfSongsToParse),
    )
  } catch (e) {
    yield put(actions.linesFetchError(e))
  }
}

export function* scrapeLinesSinceDate(action) {
  try {
    const { artistNames, timestampToParseFrom } = action.payload
    yield call(scrapeNewLines, artistNames, timestampToParseFrom)
    yield put(
      actions.scrapeLinesSinceDateSuccess(artistNames, timestampToParseFrom),
    )
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

export function* watchLineJudge() {
  yield takeLatest(ActionTypes.lineJudgeStart, lineJudge)
}

export function* watchScrapeByPopularity() {
  yield takeLatest(ActionTypes.scrapePopularStart, scrapeLinesByPopularity)
}

export function* watchScrapeSinceDate() {
  yield takeLatest(ActionTypes.scrapeLinesSinceDateStart, scrapeLinesSinceDate)
}

// Export watchers as default export in an array
export default [
  watchLineFetch,
  watchLinesFetch,
  watchLinesCreate,
  watchLineUpdate,
  watchLineDelete,
  watchLineJudge,
  watchScrapeByPopularity,
  watchScrapeSinceDate,
]
