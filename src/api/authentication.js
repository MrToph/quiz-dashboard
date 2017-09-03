import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js'
// import { parseAndHandleErrors, configurePostOptions, url } from './helpers'
import config from '../config/aws'

export function authenticate(username, password) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID,
  })
  const user = new CognitoUser({ Username: username, Pool: userPool })
  const authenticationData = { Username: username, Password: password }
  const authenticationDetails = new AuthenticationDetails(authenticationData)

  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result.getAccessToken().getJwtToken()),
      onFailure: err => reject(err),
    }),
  )
}

/*
export function signup(user, password, email) {
  const headers = configurePostOptions()

  const body = {
    name: user,

    password,

    email,
  }

  return fetch(`${url}/signup`, {
    ...headers,

    body: JSON.stringify(body),
  }).then(parseAndHandleErrors)
}
*/
