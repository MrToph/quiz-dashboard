import { spawn } from 'redux-saga/effects'
import { watchUserLogin, watchUserSignup } from './navigation/sagas'

// This Saga yields an array with the results of calling our sagas. This means the resulting Generators will be started in parallel.
// Now we only have to invoke sagaMiddleware.run on the root Saga in index.js. https://redux-saga.github.io/redux-saga/docs/introduction/BeginnerTutorial.html
export default function* rootSaga() {
  yield [
    spawn(watchUserLogin),
    spawn(watchUserSignup),
  ]
}
