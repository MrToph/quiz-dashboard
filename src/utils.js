export function isProduction() {
  return process.env.Node_ENV && process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test'
}
