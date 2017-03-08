export default class ApiError extends Error {
  constructor(message, errors) {
    if (typeof message === 'string') super(message)
    else super('API Error occured.')
    this.name = 'ApiError'
    this.errors = errors
  }
}

export function extractServerErrors(action) {
  const payload = action.payload
  let errors = []
  if (payload.errors) errors = payload.errors.slice()
  else errors = [payload.message]
  return errors
}
