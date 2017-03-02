import { call, put, select } from 'redux-saga/effects'
import * as actions from './actions'
import { artistsFetch, artistsCreate } from './sagas'
import { getArtists, createArtists } from '../../api'
import { selectAuthToken } from '../../store/selectors'

describe('artistsFetch', () => {
  const authToken = 'JWT 123123'
  it('yields the correct results', () => {
    const gen = artistsFetch(actions.artistsFetchStart())
    expect(gen.next().value).toEqual(select(selectAuthToken))
    expect(gen.next(authToken).value).toEqual(call(getArtists, authToken))

    const artists = [{ name: 'Name', url: 'URL' }, { name: 'Name2', url: 'URL2' }]
    expect(gen.next(artists).value).toEqual(put(actions.artistsFetchLoadSuccess(artists)))
  })

  it('yields error action on throw', () => {
    const gen = artistsFetch(actions.artistsFetchStart())
    expect(gen.next().value).toEqual(select(selectAuthToken))
    expect(gen.next(authToken).value).toEqual(call(getArtists, authToken))
    const someError = {
      message: 'Authentication failed',
    }
    expect(gen.throw(someError).value).toEqual(put(actions.artistsFetchError(someError)))
  })
})

describe('artistsCreate', () => {
  const authToken = 'JWT 123123'
  const name = 'Name'
  const url = 'https://name.com'

  it('yields the correct results', () => {
    const gen = artistsCreate(actions.artistsCreateStart(name, url))
    expect(gen.next().value).toEqual(select(selectAuthToken))
    expect(gen.next(authToken).value).toEqual(call(createArtists, authToken, name, url))
    expect(gen.next().value).toEqual(put(actions.artistsCreateSuccess(name, url)))
  })

  it('yields error action on throw', () => {
    const gen = artistsCreate(actions.artistsCreateStart(name, url))
    expect(gen.next().value).toEqual(select(selectAuthToken))
    expect(gen.next(authToken).value).toEqual(call(createArtists, authToken, name, url))
    const someError = {
      message: 'Authentication failed',
    }
    expect(gen.throw(someError).value).toEqual(put(actions.artistsFetchError(someError)))
  })
})

