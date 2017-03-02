import * as selectors from './selectors'

const testState = {
  login: {
    loggedIn: false,
    jwtToken: '1234',
    username: '',
    isLoading: false,
    serverErrors: ['A', 'B'],
  },
  signup: {
    isLoading: true,
    serverErrors: ['A', 'B'],
  },
}

describe('selectLogin', () => {
  it('selects the correct fields', () => {
    const expected = {
      errors: {
        form: 'A\nB',
      },
      isLoading: false,
    }
    expect(selectors.selectLogin(testState)).toEqual(expected)
  })
})

describe('selectSignup', () => {
  it('selects the correct fields', () => {
    const expected = {
      errors: {
        form: 'A\nB',
      },
      isLoading: true,
    }
    expect(selectors.selectSignup(testState)).toEqual(expected)
  })
})

describe('selectAuthToken', () => {
  it('selects the correct fields', () => {
    const expected = '1234'
    expect(selectors.selectAuthToken(testState)).toEqual(expected)
  })
})
