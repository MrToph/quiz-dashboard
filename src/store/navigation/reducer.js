import { combineReducers } from 'redux'
import ActionTypes from './actions'

export const defaultLoginState = {
  loggedIn: false,
  jwtToken: false,
  username: '',
  isLoading: false,
  serverErrors: [],
}

function extractServerErrors(action) {
  const error = action.payload
  let errors = []
  if (error.errors) errors = error.errors.slice()
  else errors = [error.message]
  return errors
}

function loginReducer(state = defaultLoginState, action) {
  switch (action.type) {
    case ActionTypes.userLoginStart: {
      const { username } = action.payload
      return {
        ...state,
        username,
        isLoading: true,
        loggedIn: false,
      }
    }
    case ActionTypes.userLoginSuccess: {
      const { apiToken } = action.payload
      return {
        ...state,
        jwtToken: apiToken,
        isLoading: false,
      }
    }
    case ActionTypes.userLoginError: {
      const errors = extractServerErrors(action)
      return {
        ...state,
        serverErrors: errors,
        isLoading: false,
        loggedIn: false,
      }
    }
    default:
      return state
  }
}

export const defaultSignupState = {
  isLoading: false,
  serverErrors: [],
}

function signupReducer(state = defaultSignupState, action) {
  switch (action.type) {
    case ActionTypes.userSignupStart: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionTypes.userSignupSuccess: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case ActionTypes.userSignupError: {
      const errors = extractServerErrors(action)
      return {
        ...state,
        serverErrors: errors,
        isLoading: false,
      }
    }
    default: {
      return state
    }
  }
}

const reducers = combineReducers({
  login: loginReducer,
  signup: signupReducer,
})

export const defaultState = {
  login: defaultLoginState,
  signup: defaultSignupState,
}

export default reducers
