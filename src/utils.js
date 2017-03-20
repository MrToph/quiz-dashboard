export function isProduction() {
  return process.env.Node_ENV && process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test'
}

// dev only (returns false for test env)
export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

// returns date in yyyy-mm-dd
export function dateToInputFormat(date) {
  const mm = date.getMonth() + 1 // getMonth() is zero-based
  const dd = date.getDate()

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('-')
}
