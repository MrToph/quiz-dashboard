export const selectLogin = state => ({
  errors: { form: state.login.serverErrors.join('\n') },
  isLoading: state.login.isLoading,
})