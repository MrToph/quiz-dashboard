const ActionTypes = {
  userLoginStart: 'LOGIN_START',
  userLoginSuccess: 'LOGIN_SUCCESS',
  userLoginError: 'LOGIN_ERROR',
}

export default ActionTypes

export const userLoginStart = (username, password) => ({
  type: ActionTypes.userLoginStart,
  payload: {
    username,
    password,
  },
})

export const userLoginSuccess = username => ({
  type: ActionTypes.userLoginSuccess,
  payload: {
    username,
  },
})

export const userLoginError = error => ({
  type: ActionTypes.userLoginError,
  payload: error,
})
