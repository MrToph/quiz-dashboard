import fetchMock from 'fetch-mock'
import { url, authenticate, signup } from './index'

function setupMocks() {
  fetchMock.post(`${url}/authenticate`, JSON.stringify({
    token: '1234',
  }))

  fetchMock.post(`${url}/signup`, JSON.stringify({ }))
}

const username = 'TestName'
const password = 'TestPassword'
const email = 'TestEmail'

describe('authenticate', () => {
  beforeEach(() => {
    fetchMock.restore()
    setupMocks()
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('should send correct parameters and return the apiToken on success', () => authenticate(username, password)
    .then((apiToken) => {
      expect(apiToken).toBe('1234')
      const lastCall = fetchMock.lastCall()
      expect(lastCall[0]).toBe(`${url}/authenticate`)
      const lastCallBody = lastCall[1].body
      expect(lastCallBody).toBe(JSON.stringify({
        name: username,
        password,
      }))
    }))
})


describe('signup', () => {
  beforeEach(() => {
    fetchMock.restore()
    setupMocks()
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('should send correct parameters', () => signup(username, password, email)
    .then(() => {
      const lastCall = fetchMock.lastCall()
      expect(lastCall[0]).toBe(`${url}/signup`)
      const lastCallBody = lastCall[1].body
      expect(lastCallBody).toBe(JSON.stringify({
        name: username,
        password,
        email,
      }))
    }))
})
