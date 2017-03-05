import Validator from 'validator'

function checkRequiredFields(data, requiredFields) {
  const errors = {}
  requiredFields.forEach((field) => {
    if (Validator.isEmpty(data[field])) errors[field] = 'This field is required.'
  })
  return errors
}

export function validateLoginInput(data) {
  const errors = checkRequiredFields(data, ['username', 'password'])

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

export function validateArtistInput(data) {
  const errors = checkRequiredFields(data, ['name', 'url'])

  if (!Validator.isURL(data.url)) {
    errors.url = 'This field is not a valid URL'
  }

  return { errors, isValid: Object.keys(errors).length === 0 }
}

export function validateLineInput(data, artists) {
  const errors = checkRequiredFields(data, ['text', 'artist', 'songTitle', 'language', 'active'])

  if (!artists.find(artist => artist === data.artist)) {
    errors.artist = 'Artist invalid. Create the artist first.'
  }

  if (!['en', 'de'].find(language => language === data.language)) {
    errors.language = 'Language invalid. Must be German or English.'
  }

  return { errors, isValid: Object.keys(errors).length === 0 }
}

