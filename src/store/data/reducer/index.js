import { combineReducers } from 'redux'
import artistsReducer, { defaultArtistsState } from './artists'
import linesReducer, { defaultLinesState } from './lines'

const reducers = combineReducers({
  artists: artistsReducer,
  lines: linesReducer,
})

export const defaultState = {
  artists: defaultArtistsState,
  lines: defaultLinesState,
}

export default reducers
