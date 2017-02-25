import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import { userLogin, userSignup } from './sagas'
import { authenticate, signup } from '../../api'

describe('userLogin', () => {
  const user = 'TestUser'
  const password = 'TestPassword'

  it('yields the correct results', () => {
    const gen = userLogin(actions.userLoginStart(user, password))
    expect(gen.next().value).toEqual(call(authenticate, user, password))
    expect(gen.next(user).value).toEqual(put(actions.userLoginSuccess(user)))
  })

  it('yields login error action on throw', () => {
    const gen = userLogin(actions.userLoginStart(user, password))
    expect(gen.next().value).toEqual(call(authenticate, user, password))
    const someError = {
      message: 'Authentication failed',
    }
    expect(gen.throw(someError).value).toEqual(put(actions.userLoginError(someError)))
  })
})

describe('userSignup', () => {
  const user = 'TestUser'
  const password = 'TestPassword'
  const email = 'TestEmail'

  it('yields the correct results', () => {
    const gen = userSignup(actions.userSignupStart(user, password, email))
    expect(gen.next().value).toEqual(call(signup, user, password, email))
    expect(gen.next().value).toEqual(put(actions.userSignupSuccess()))
  })

  it('yields login error action on throw', () => {
    const gen = userSignup(actions.userSignupStart(user, password, email))
    expect(gen.next().value).toEqual(call(signup, user, password, email))
    const someError = {
      message: 'Authentication failed',
    }
    expect(gen.throw(someError).value).toEqual(put(actions.userSignupError(someError)))
  })
})
