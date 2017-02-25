import fetchMock from 'fetch-mock'
import { url, authenticate } from './index'

function setupMocks() {
  fetchMock.post(`${url}/authenticate`, JSON.stringify({
    apiToken: '1234',
  }))
}

describe('authenticate', () => {
  beforeEach(() => {
    fetchMock.restore()
    setupMocks()
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('should send correct parameters and return the apiToken on success', () => {
    return authenticate('Test', 'password')
    .then((apiToken) => {
      expect(apiToken).toBe('1234')
      const lastCall = fetchMock.lastCall()
      expect(lastCall[0]).toBe(`${url}/authenticate`)
      const lastCallBody = lastCall[1].body
      expect(lastCallBody).toBe(JSON.stringify({
        name: 'Test',
        password: 'password',
      }))
    })
  })
})
