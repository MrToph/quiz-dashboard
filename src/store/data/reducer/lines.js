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
    default: {
      return state
    }
  }
}

export default linesReducer
