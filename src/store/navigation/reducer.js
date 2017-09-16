import { combineReducers } from 'redux'
import { extractServerErrors } from '../../api/Error'
import { signOutUser } from '../../api/libs/awsLib'
import ActionTypes from './actions'

export const defaultLoginState = {
  loggedIn: false,
  username: '',
  isLoading: false,
  serverErrors: [],
}

function loginReducer(state = defaultLoginState, action) {
  switch (action.type) {
    case ActionTypes.appStarted: {
      // authentication from session done in the saga
      // and updated in the AWS.config state
      return state
    }

    case ActionTypes.userLoginStart: {
      const { username } = action.payload
      return {
        ...state,
        username,
        isLoading: true,
        loggedIn: false,
        serverErrors: [],
      }
    }

    case ActionTypes.userLoginSuccess: {
      const newState = {
        ...state,
        isLoading: false,
        loggedIn: true,
      }
      return newState
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

    case ActionTypes.userLogout: {
      signOutUser()
      return defaultLoginState
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
