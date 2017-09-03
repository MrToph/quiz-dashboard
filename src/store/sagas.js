import { spawn } from 'redux-saga/effects'
import navigationWatchers from './navigation/sagas'
import dataWatchers from './data/sagas'

// This Saga yields an array with the results of calling our sagas. This means the resulting Generators will be started in parallel.
// Now we only have to invoke sagaMiddleware.run on the root Saga in index.js. https://redux-saga.github.io/redux-saga/docs/introduction/BeginnerTutorial.html
export default function* rootSaga() {
  yield [
    ...navigationWatchers.map(watcher => spawn(watcher)),
    ...dataWatchers.map(watcher => spawn(watcher)),
  ]
}
