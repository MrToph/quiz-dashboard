import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { hookConsoleLog } from 'stacklogger'
import navReducer from './navigation/reducer'
import dataReducer from './data/reducer'
import rootSaga from './sagas'
import { isDevelopment } from '../utils'

const middleWares = []

// saga-middleWares
const sagaMiddleWare = createSagaMiddleware()
middleWares.push(sagaMiddleWare)


if (isDevelopment()) {
  hookConsoleLog()
  middleWares.push(logger())
}

const reducers = combineReducers({
  navigation: navReducer,
  data: dataReducer,
})

const store = createStore(reducers, undefined, applyMiddleware(...middleWares))

// run sagas
sagaMiddleWare.run(rootSaga)

export default store
