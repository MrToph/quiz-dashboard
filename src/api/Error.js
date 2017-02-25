export default class ApiError extends Error {
  constructor(message, errors) {
    if (typeof message === 'string') super(message)
    else super('API Error occured.')
    this.name = 'ApiError'
    this.errors = errors
  }
}
