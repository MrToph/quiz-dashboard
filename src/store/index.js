import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import navReducer from './navigation/reducer'
import rootSaga from './sagas'
import { isProduction } from '../utils'

const middleWares = []

// saga-middleWares
const sagaMiddleWare = createSagaMiddleware()
middleWares.push(sagaMiddleWare)


if (!isProduction()) {
  middleWares.push(logger())
}

const reducers = combineReducers({
  navigation: navReducer,
})

const store = createStore(reducers, undefined, applyMiddleware(...middleWares))

// run sagas
sagaMiddleWare.run(rootSaga)

export default store
