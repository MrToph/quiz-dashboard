import { combineReducers } from 'redux'
import { extractServerErrors } from '../../api/Error'
import ActionTypes from './actions'

export const defaultArtistsState = {
  isLoading: false,
  formOpen: false,
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
    case ActionTypes.artistsFetchStart:
    case ActionTypes.artistSingleFetchStart:
    case ActionTypes.artistUpdateStart: {
      return {
        ...state,
        isLoading: true,
        serverErrors: [],
      }
    }
    case ActionTypes.artistsCreateStart: {
      return {
        ...state,
        formOpen: true,  /* set to true, so false can get injected on success */
        isLoading: true,
        serverErrors: [],
      }
    }
    case ActionTypes.artistsFetchLoadSuccess: {
      const { artists } = action.payload
      const newArtists = artists.map(artist => artist.name)
      const newArtistsByName = { }
      artists.forEach((artist) => {
        newArtistsByName[artist.name] = artist
      })
      return {
        ...state,
        isLoading: false,
        artists: newArtists,
        artistsByName: newArtistsByName,
      }
    }
    case ActionTypes.artistSingleFetchLoadSuccess: {
      const { artist } = action.payload
      const newArtists = state.artists.find(name => name === artist.name) ? state.artists : state.artists.concat([artist.name])
      const newArtistsByName = {
        ...state.artistsByName,
        [artist.name]: artist,
      }
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
    case ActionTypes.artistsCreateSuccess: {
      // if server responded with success, add it to our list without fetching the list from the server again
      const { name, url } = action.payload
      const newArtists = [...state.artists, name]
      const newArtistsByName = {
        ...state.artistsByName,
        [name]: {
          name, url,
        },
      }
      return {
        ...state,
        formOpen: false,  /* close form on success */
        isLoading: false,
        artists: newArtists,
        artistsByName: newArtistsByName,
      }
    }
    case ActionTypes.artistUpdateSuccess: {
      // if server responded with success, add it to our list without fetching the list from the server again
      const { name, url, oldName } = action.payload
      const index = state.artists.findIndex(artistName => artistName === oldName)
      const newArtists = state.artists.slice().splice(index, 1, name)
      const newArtistsByName = {
        ...state.artistsByName,
        [name]: {
          name, url,
        },
      }
      if (oldName !== name) delete newArtistsByName[oldName]

      return {
        ...state,
        isLoading: false,
        artists: newArtists,
        artistsByName: newArtistsByName,
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
