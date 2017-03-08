import { extractServerErrors } from '../../../api/Error'
import ActionTypes from '../actions/lines'

export const defaultLinesState = {
  isLoading: false,
  formOpen: false,
  serverErrors: [],
  lines: ['id31415'],
  linesById: {
    id31415: {
      id: 'id31415',
      text: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.",
      artist: 'Artist 1',
      songTitle: 'Song 1',
      album: 'Album 1',
      language: 'de',   // possible values: 'en' or 'de'
      moreUrl: 'https://genius.com',
      active: false,
    },
  },
}

function linesReducer(state = defaultLinesState, action) {
  switch (action.type) {
    case ActionTypes.linesFetchStart:
    case ActionTypes.lineSingleFetchStart:
    case ActionTypes.lineUpdateStart:
    case ActionTypes.lineDeleteStart: {
      return {
        ...state,
        isLoading: true,
        serverErrors: [],
      }
    }
    case ActionTypes.linesCreateStart: {
      return {
        ...state,
        formOpen: true,  /* set to true, so false can get injected on success */
        isLoading: true,
        serverErrors: [],
      }
    }
    case ActionTypes.linesFetchLoadSuccess: {
      const { lines } = action.payload
      const newLines = lines.map(line => line.id)
      const newLinesById = { }
      lines.forEach((line) => {
        newLinesById[line.id] = line
      })
      return {
        ...state,
        isLoading: false,
        lines: newLines,
        linesById: newLinesById,
      }
    }
    case ActionTypes.lineSingleFetchLoadSuccess: {
      const { line } = action.payload
      const newLines = state.lines.find(id => id === line.id) ? state.lines : state.lines.concat([line.id])
      const newLinesById = {
        ...state.linesById,
        [line.id]: line,
      }
      return {
        ...state,
        isLoading: false,
        lines: newLines,
        linesById: newLinesById,
      }
    }
    case ActionTypes.linesFetchError: {
      const errors = extractServerErrors(action)
      return {
        ...state,
        formOpen: true,
        serverErrors: errors,
        isLoading: false,
      }
    }
    case ActionTypes.linesCreateSuccess: {
      // if server responded with success, add it to our list without fetching the list from the server again
      const line = action.payload
      const newLines = [...state.lines, line.id]
      const newLinesById = {
        ...state.linesById,
        [line.id]: line,
      }
      return {
        ...state,
        formOpen: false,  /* close form on success */
        isLoading: false,
        lines: newLines,
        linesById: newLinesById,
      }
    }
    case ActionTypes.linesUpdateSuccess: {
      // id never changes
      const line = action.payload
      const newLinesById = {
        ...state.linesById,
        [line.id]: line,
      }

      return {
        ...state,
        isLoading: false,
        linesById: newLinesById,
      }
    }
    case ActionTypes.linesDeleteSuccess: {
      const { id } = action.payload
      const newLines = state.lines.filter(lineId => lineId !== id)
      const newLinesById = {
        ...state.linesById,
        [id]: undefined,
      }
      return {
        ...state,
        isLoading: false,
        lines: newLines,
        linesById: newLinesById,
      }
    }
    default: {
      return state
    }
  }
}

export default linesReducer
