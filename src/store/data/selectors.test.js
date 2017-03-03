import * as selectors from './selectors'

const testState = {
  artists: {
    formOpen: false,
    isLoading: true,
    serverErrors: ['A', 'B'],
    artists: ['Artist 1', 'Artist 2'],
    artistsByName: {
      'Artist 1': {
        name: 'Artist 1',
        url: 'https://artist-one.org',
      },
      'Artist 2': {
        name: 'Artist 2',
        url: 'http://artist2.com',
      },
    },
  },
}

describe('selectArtist', () => {
  it('selects the correct fields', () => {
    const expected = {
      name: 'Artist 2',
      url: 'http://artist2.com',
    }
    expect(selectors.selectArtist(testState, 'Artist 2')).toEqual(expected)
  })
})

describe('selectArtists', () => {
  it('selects the correct fields', () => {
    const expected = [{
      name: 'Artist 1',
      url: 'https://artist-one.org',
    }, {
      name: 'Artist 2',
      url: 'http://artist2.com',
    }]
    expect(selectors.selectArtists(testState)).toEqual(expected)
  })
})

describe('selectArtistForm', () => {
  it('selects the correct fields', () => {
    const expected = {
      errors: {
        form: 'A\nB',
      },
      isLoading: true,
      formOpen: false,
    }
    expect(selectors.selectArtistForm(testState)).toEqual(expected)
  })
})
