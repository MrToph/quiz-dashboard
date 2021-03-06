// import { isProduction } from '../../utils'

var ActionTypes = { // eslint-disable-line
  userLoginStart: 'LOGIN_START',
  userLoginSuccess: 'LOGIN_SUCCESS',
  userLoginError: 'LOGIN_ERROR',
  userSignupStart: 'SIGNUP_START',
  userSignupSuccess: 'SIGNUP_SUCCESS',
  userSignupError: 'SIGNUP_ERROR',
  userLogout: 'LOGOUT',
  appStarted: 'APP_STARTED',
}

// requires ES6 Proxies, we don't want to link them at run-time
// if (!isProduction()) {
//   const handler = {
//     get: (target, key) => {
//       if (Object.prototype.hasOwnProperty.call(target, key)) return target[key]
//       throw new Error(`Fired a wrong actionname: ${key}. Available Actions: ${Object.keys(target)}`)
//     },
//   }
//   ActionTypes = new Proxy(ActionTypes, handler)
// }

export default ActionTypes

export const createAppStarted = () => ({
  type: ActionTypes.appStarted,
})

export const userLoginStart = (username, password) => ({
  type: ActionTypes.userLoginStart,
  payload: {
    username,
    password,
  },
})

export const userLoginSuccess = apiToken => ({
  type: ActionTypes.userLoginSuccess,
  payload: {
    apiToken,
  },
})

export const userLoginError = error => ({
  type: ActionTypes.userLoginError,
  payload: error,
})

export const userLogout = () => ({
  type: ActionTypes.userLogout,
})

export const userSignupStart = (username, password, email) => ({
  type: ActionTypes.userSignupStart,
  payload: {
    username,
    password,
    email,
  },
})

export const userSignupSuccess = () => ({
  type: ActionTypes.userSignupSuccess,
})

export const userSignupError = error => ({
  type: ActionTypes.userSignupError,
  payload: error,
})
