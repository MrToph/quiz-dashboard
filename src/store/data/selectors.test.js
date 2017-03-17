import * as selectors from './selectors'

const testLine = {
  id: 'id123456',
  text: 'Text 2',
  artist: 'Artist 1',
  songTitle: 'Song 1',
  album: 'Album 1',
  language: 'de',
  moreUrl: 'https://genius.com',
  active: false,
}

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
  lines: {
    isLoading: false,
    formOpen: false,
    hasMoreLines: false,
    serverErrors: ['A', 'B'],
    lines: ['id123456', 'id123457', 'id123458'],
    linesById: {
      id123456: testLine,
      id123457: {
        id: 'id123457',
        ...testLine,
        text: 'Text 2',
      },
      id123458: {
        ...testLine,
        id: 'id123458',
        text: 'Text 3',
        active: true,
      },
    },
  },
}

describe('testState', () => {
  it('should have lines sorted in ascending order', () => {
    const sorted = testState.lines.lines.slice().sort((l1, l2) => l1.localeCompare(l2)) // ascending
    expect(testState.lines.lines).toEqual(sorted)
  })
})

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

describe('selectLines', () => {
  it('selects inactive lines only', () => {
    const expected = [
      testState.lines.linesById.id123456,
      testState.lines.linesById.id123457,
    ]
    expect(selectors.selectLines(testState, false)).toEqual(expected)
  })

  it('selects active lines only', () => {
    const expected = [
      testState.lines.linesById.id123458,
    ]
    expect(selectors.selectLines(testState, true)).toEqual(expected)
  })
})

describe('selectLine', () => {
  it('selects correct field', () => {
    const expected = testState.lines.linesById.id123457
    expect(selectors.selectLine(testState, 'id123457')).toEqual(expected)
  })
})

describe('selectLatestLineId', () => {
  it('selects "biggest" inactive field', () => {
    const expected = 'id123457'
    expect(selectors.selectLatestLineId(testState, false)).toEqual(expected)
  })

  it('selects "biggest" active field', () => {
    const expected = 'id123458'
    expect(selectors.selectLatestLineId(testState, true)).toEqual(expected)
  })
})

describe('selectLineForm', () => {
  it('selects the correct fields', () => {
    const expected = {
      errors: {
        form: 'A\nB',
      },
      isLoading: false,
      formOpen: false,
    }
    expect(selectors.selectLineForm(testState)).toEqual(expected)
  })
})
