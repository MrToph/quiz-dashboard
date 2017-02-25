import Validator from 'validator'

export function validateLoginInput(data) {
  const errors = {}

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required'
  }

  return { errors, isValid: Object.keys(errors).length === 0 }
}

export function validateSignupInput(data) {
  const { errors } = validateLoginInput(data)

  // check email in addition
  if (!Validator.isEmail(data.email)) {
    errors.email = 'This is not a valid email address'
  }

  return { errors, isValid: Object.keys(errors).length === 0 }
}
