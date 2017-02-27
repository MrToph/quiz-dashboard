// File has to be at this location! Cannot use custom setupFiles in package.json's "jest" config https://github.com/facebookincubator/create-react-app/issues/545

const localStorageMock = (() => {
  let store = {}

  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => { store[key] = value.toString() }),
    removeItem: jest.fn((key) => { delete store[key] }),
    clear: jest.fn(() => { store = {} }),
  }
})()

global.localStorage = localStorageMock
