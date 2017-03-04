import { call, put, select } from 'redux-saga/effects'
import * as actions from './actions'
import { artistFetch, artistsFetch, artistsCreate, artistUpdate, artistDelete } from './sagas'
import { getArtist, getArtists, createArtists, updateArtist, deleteArtist } from '../../api'
import { selectAuthToken } from '../../store/selectors'

const authToken = 'JWT 123456'

const tests = [
  {
    testName: 'artistsFetch',
    saga: artistsFetch,
    initialActionCreator: actions.artistsFetchStart,
    successActionCreator: actions.artistsFetchLoadSuccess,
    apiCall: getArtists,
    actionCreatorArguments: [],
    apiReturnValue: [{ name: 'Name', url: 'URL' }, { name: 'Name2', url: 'URL2' }],
  },
  {
    testName: 'artistsCreate',
    saga: artistsCreate,
    initialActionCreator: actions.artistsCreateStart,
    successActionCreator: actions.artistsCreateSuccess,
    apiCall: createArtists,
    actionCreatorArguments: ['Name', 'https://name.com'],
  },
  {
    testName: 'artistUpdate',
    saga: artistUpdate,
    initialActionCreator: actions.artistUpdateStart,
    successActionCreator: actions.artistUpdateSuccess,
    apiCall: updateArtist,
    actionCreatorArguments: ['Name', 'Updated Name', 'https://updated.com'],
  },
  {
    testName: 'artistDelete',
    saga: artistDelete,
    initialActionCreator: actions.artistDeleteStart,
    successActionCreator: actions.artistDeleteSuccess,
    apiCall: deleteArtist,
    actionCreatorArguments: ['Name'],
  },
  {
    testName: 'artistSingleFetch',
    saga: artistFetch,
    initialActionCreator: actions.artistSingleFetchStart,
    successActionCreator: actions.artistSingleFetchLoadSuccess,
    apiCall: getArtist,
    actionCreatorArguments: ['Name'],
    apiReturnValue: { name: 'Name', url: 'URL' },
  },
]

tests.forEach(({ testName, saga, initialActionCreator, successActionCreator, apiCall, actionCreatorArguments, apiReturnValue }) => {
  describe(testName, () => {
    it('yields the correct results', () => {
      const gen = saga(initialActionCreator(...actionCreatorArguments))
      expect(gen.next().value).toEqual(select(selectAuthToken))
      expect(gen.next(authToken).value).toEqual(call(apiCall, authToken, ...actionCreatorArguments))
      if (apiReturnValue) expect(gen.next(apiReturnValue).value).toEqual(put(successActionCreator(apiReturnValue)))
      else expect(gen.next().value).toEqual(put(successActionCreator(...actionCreatorArguments)))
    })

    it('yields error action on throw', () => {
      const gen = saga(initialActionCreator(...actionCreatorArguments))
      expect(gen.next().value).toEqual(select(selectAuthToken))
      expect(gen.next(authToken).value).toEqual(call(apiCall, authToken, ...actionCreatorArguments))
      const someError = {
        message: 'Authentication failed',
      }
      expect(gen.throw(someError).value).toEqual(put(actions.artistsFetchError(someError)))
    })
  })
})

