import reducer, { defaultState } from './reducer'
import * as actions from './actions'

const user = 'TestUser'
const password = 'TestPassword'
const email = 'TestEmail'
const jwtToken = 'JWT 123123'

describe('defaultState', () => {
  it('should not be null', () => {
    expect(defaultState).toBeDefined()
    expect(defaultState).not.toBeNull()
  })
})

describe('reducer', () => {
  it('should return default state given no action', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
})

describe('reducer handles logins / logouts with localStorage', () => {
  beforeEach(() => {
    // mockLocalStorage()
  })

  it('saves login state to local storage', () => {
    const expected = {
      loggedIn: true,
      jwtToken,
      username: user,
      isLoading: false,
      serverErrors: [],
    }
    const state = reducer(undefined, actions.userLoginStart(user, password))
    expect(reducer(state, actions.userLoginSuccess(jwtToken)).login).toEqual(expected)
    expect(localStorage.setItem).toHaveBeenCalledWith('login', JSON.stringify(expected))
  })

  it('clears login state on local storage on logout', () => {
    const expected = {
      loggedIn: false,
      jwtToken: false,
      username: '',
      isLoading: false,
      serverErrors: [],
    }
    let state = reducer(undefined, actions.userLoginStart(user, password))
    state = reducer(state, actions.userLoginSuccess(jwtToken))
    expect(reducer(state, actions.userLogout()).login).toEqual(expected)
    expect(localStorage.removeItem).toHaveBeenCalledWith('login')
  })
})
