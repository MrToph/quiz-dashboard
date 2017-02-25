import reducer, { defaultState } from './reducer'
import * as actions from './actions'

describe('defaultState', () => {
  it('should not be null', () => {
    expect(defaultState).toBeDefined()
    expect(defaultState).not.toBeNull()
  })
})

describe('reducer', () => {
  it('should return default state given no action', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
})
