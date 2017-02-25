import { combineReducers } from 'redux'
import ActionTypes from './actions'

export const defaultLoginState = {
  loggedIn: false,
  jwtToken: false,
  username: '',
  isLoading: false,
  serverErrors: [],
}

function loginReducer(state = defaultLoginState, action) {
  switch (action.type) {
    case ActionTypes.userLoginStart: {
      const { username, password } = action.payload
      return {
        ...state,
        username,
        isLoading: true,
        loggedIn: false,
      }
    }
    case ActionTypes.userLoginError: {
      const error = action.payload
      let errors = []
      if (error.errors) errors = error.errors.slice()
      else errors = [error.message]
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

const reducers = combineReducers({
  login: loginReducer,
})

export const defaultState = {
  login: defaultLoginState,
}

export default reducers
