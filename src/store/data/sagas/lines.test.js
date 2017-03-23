import { call, put, select } from 'redux-saga/effects'
import * as actions from '../actions/lines'
import { lineFetch, linesFetch, linesCreate, lineUpdate, lineDelete, lineJudge, scrapeLinesByPopularity, scrapeLinesSinceDate } from './lines'
import { getLine, getLines, createLines, updateLine, deleteLine, judgeLine, scrapePopularLines, scrapeNewLines } from '../../../api'
import { selectAuthToken, selectLatestLineId } from '../../../store/selectors'

const authToken = 'JWT 123456'
const exampleLineWithoutId = {
  text: 'Example Text',
  artist: 'Artist 1',
  songTitle: 'Song 1',
  album: 'Album 1',
  language: 'de',   // possible values: 'en' or 'de'
  moreUrl: 'https://genius.com',
  active: false,
}
const exampleLine = {
  ...exampleLineWithoutId,
  id: 'id123456',
}

const tests = [
  {
    testName: 'linesCreate',
    saga: linesCreate,
    initialActionCreator: actions.linesCreateStart,
    initialActionCreatorArguments: [exampleLine.text, exampleLine.artist, exampleLine.songTitle, exampleLine.album, exampleLine.language, exampleLine.moreUrl, exampleLine.active],
    apiCall: createLines,
    apiCallArguments: [exampleLineWithoutId],
    apiReturnValue: exampleLine,
    successActionCreator: actions.linesCreateSuccess,
    successActionCreatorArguments: [exampleLine],
  },
  {
    testName: 'lineUpdate',
    saga: lineUpdate,
    initialActionCreator: actions.lineUpdateStart,
    initialActionCreatorArguments: [exampleLine.id, exampleLine.text, exampleLine.artist, exampleLine.songTitle, exampleLine.album, exampleLine.language, exampleLine.moreUrl, exampleLine.active],
    apiCall: updateLine,
    apiCallArguments: [exampleLine],
    apiReturnValue: exampleLine,
    successActionCreator: actions.lineUpdateSuccess,
    successActionCreatorArguments: [exampleLine],
  },
  {
    testName: 'lineDelete',
    saga: lineDelete,
    initialActionCreator: actions.lineDeleteStart,
    initialActionCreatorArguments: [exampleLine.id],
    apiCall: deleteLine,
    apiCallArguments: [exampleLine.id],
    successActionCreator: actions.lineDeleteSuccess,
    successActionCreatorArguments: [exampleLine.id],
  },
  {
    testName: 'lineSingleFetch',
    saga: lineFetch,
    initialActionCreator: actions.lineSingleFetchStart,
    initialActionCreatorArguments: [exampleLine.id],
    apiCall: getLine,
    apiCallArguments: [exampleLine.id],
    apiReturnValue: exampleLine,
    successActionCreator: actions.lineSingleFetchLoadSuccess,
    successActionCreatorArguments: [exampleLine],
  },
  {
    testName: 'lineJudge',
    saga: lineJudge,
    initialActionCreator: actions.lineJudgeStart,
    initialActionCreatorArguments: [exampleLine.id, true],
    apiCall: judgeLine,
    apiCallArguments: [exampleLine.id, true],
    successActionCreator: actions.lineJudgeSuccess,
    successActionCreatorArguments: [exampleLine.id, true],
  },
  {
    testName: 'scrapeLinesByPopularity',
    saga: scrapeLinesByPopularity,
    initialActionCreator: actions.scrapeLinesByPopularityStart,
    initialActionCreatorArguments: [['Artist1', 'Artist2'], 29],
    apiCall: scrapePopularLines,
    apiCallArguments: [['Artist1', 'Artist2'], 29],
    successActionCreator: actions.scrapeLinesByPopularitySuccess,
    successActionCreatorArguments: [['Artist1', 'Artist2'], 29],
  },
  {
    testName: 'scrapeLinesSinceDate',
    saga: scrapeLinesSinceDate,
    initialActionCreator: actions.scrapeLinesSinceDateStart,
    initialActionCreatorArguments: [['Artist1', 'Artist2'], '2017-04-29'],
    apiCall: scrapeNewLines,
    apiCallArguments: [['Artist1', 'Artist2'], 1493424000 * 1000],
    successActionCreator: actions.scrapeLinesSinceDateSuccess,
    successActionCreatorArguments: [['Artist1', 'Artist2'], '2017-04-29'],
  },
]


describe('linesFetch', () => {
  it('yields the correct results', () => {
    const lineStatusActive = false
    const isInitial = true
    const lastLineId = false
    const gen = linesFetch(actions.linesFetchStart(lineStatusActive, isInitial))
    expect(gen.next().value).toEqual(select(selectAuthToken))
    expect(gen.next(authToken).value).toEqual(call(getLines, authToken, lineStatusActive, lastLineId))
    const apiReturnValue = [{ bla: 5 }]
    expect(gen.next(apiReturnValue).value).toEqual(put(actions.linesFetchLoadSuccess(apiReturnValue, isInitial)))
  })

  it('yields the correct results on successive fetch', () => {
    const lineStatusActive = false
    const isInitial = false
    const lastLineId = '123456'
    const gen = linesFetch(actions.linesFetchStart(lineStatusActive, isInitial))
    expect(gen.next().value).toEqual(select(selectAuthToken))
    expect(gen.next(authToken).value).toEqual(select(selectLatestLineId, lineStatusActive))
    expect(gen.next(lastLineId).value).toEqual(call(getLines, authToken, lineStatusActive, lastLineId))
    const apiReturnValue = [{ bla: 5 }]
    expect(gen.next(apiReturnValue).value).toEqual(put(actions.linesFetchLoadSuccess(apiReturnValue, isInitial)))
  })

  it('yields error action on throw', () => {
    const lineStatusActive = false
    const isInitial = false
    const lastLineId = '123456'
    const gen = linesFetch(actions.linesFetchStart(lineStatusActive, isInitial))
    expect(gen.next().value).toEqual(select(selectAuthToken))
    expect(gen.next(authToken).value).toEqual(select(selectLatestLineId, lineStatusActive))
    expect(gen.next(lastLineId).value).toEqual(call(getLines, authToken, lineStatusActive, lastLineId))
    const someError = {
      message: 'Authentication failed',
    }
    expect(gen.throw(someError).value).toEqual(put(actions.linesFetchError(someError)))
  })
})

tests.forEach(({ testName, saga, initialActionCreator, initialActionCreatorArguments, successActionCreator, successActionCreatorArguments,
    apiCall, apiCallArguments, apiReturnValue }) => {
  describe(testName, () => {
    it('yields the correct results', () => {
      const gen = saga(initialActionCreator(...initialActionCreatorArguments))
      expect(gen.next().value).toEqual(select(selectAuthToken))
      expect(gen.next(authToken).value).toEqual(call(apiCall, authToken, ...apiCallArguments))
      expect(gen.next(apiReturnValue).value).toEqual(put(successActionCreator(...successActionCreatorArguments)))
    })

    it('yields error action on throw', () => {
      const gen = saga(initialActionCreator(...initialActionCreatorArguments))
      expect(gen.next().value).toEqual(select(selectAuthToken))
      expect(gen.next(authToken).value).toEqual(call(apiCall, authToken, ...apiCallArguments))
      const someError = {
        message: 'Authentication failed',
      }
      expect(gen.throw(someError).value).toEqual(put(actions.linesFetchError(someError)))
    })
  })
})

