import * as selectors from './selectors'

const testState = {
  artists: {
    isLoading: false,
    serverErrors: [],
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

describe('selectArtists', () => {
  it('selects the correct fields', () => {
    const expected = [{
      name: 'Artist 2',
      url: 'http://artist2.com',
    }, {
      name: 'Artist 2',
      url: 'http://artist2.com',
    }]
    expect(selectors.selectLogin(testState)).toEqual(expected)
  })
})
