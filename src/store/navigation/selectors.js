export const selectLogin = state => ({
  errors: { form: state.login.serverErrors.join('\n') },
  isLoading: state.login.isLoading,
})

export const selectIsLoggedIn = state => state.login.loggedIn

export const selectSignup = state => ({
  errors: { form: state.signup.serverErrors.join('\n') },
  isLoading: state.signup.isLoading,
})

export const selectAuthToken = state => state.login.jwtToken
