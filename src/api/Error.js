export default class ApiError extends Error {
  constructor(message, errors) {
    if (typeof message === 'string') super(message)
    else super('API Error occured.')
    this.name = 'ApiError'
    this.errors = errors
  }
}

export function extractServerErrors(action) {
  const error = action.payload
  let errors = []
  if (error.errors) errors = error.errors.slice()
  else errors = [error.message]
  return errors
}
