import { combineReducers } from 'redux'
import { extractServerErrors } from '../../api/Error'
import ActionTypes from './actions'

export const defaultArtistsState = {
  isLoading: false,
  serverErrors: [],
  artists: ['Artist 1', 'Artist 2'],
  artistsByName: {
    'Artist 1': {
      name: 'Artist 1',
      url: 'https://artist-one.org',
    },
    'Artist 2': {
      name: 'Artist 2',
      url: 'http://artist2.com',
    },
  },
}

function artistsReducer(state = defaultArtistsState, action) {
  switch (action.type) {
    case ActionTypes.artistsFetchStart: {
      return {
        ...state,
        isLoading: true,
        serverErrors: [],
      }
    }
    case ActionTypes.artistsLoadSuccess: {
      const newArtists = state.artists
      const newArtistsByName = { ...state.artistsByName }
      return {
        ...state,
        isLoading: false,
        artists: newArtists,
        artistsByName: newArtistsByName,
      }
    }
    case ActionTypes.artistsUpdateSuccess: {
      const newArtists = state.artists
      const newArtistsByName = { ...state.artistsByName }
      return {
        ...state,
        isLoading: false,
        artists: newArtists,
        artistsByName: newArtistsByName,
      }
    }
    case ActionTypes.artistsFetchError: {
      const errors = extractServerErrors(action)
      return {
        ...state,
        serverErrors: errors,
        isLoading: false,
      }
    }
    default: {
      return state
    }
  }
}

const reducers = combineReducers({
  artists: artistsReducer,
})

export const defaultState = {
  artists: defaultArtistsState,
}

export default reducers
