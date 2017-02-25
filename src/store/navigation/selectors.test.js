import * as selectors from './selectors'

const testState = {
  login: {
    loggedIn: false,
    jwtToken: false,
    username: '',
    isLoading: false,
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
