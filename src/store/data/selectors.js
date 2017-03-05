export const selectArtist = (state, name) => {
  if (state.artists.artistsByName[name]) return Object.assign({}, state.artists.artistsByName[name])
  return null
}

export const selectArtists = (state) => {
  const artists = []
  state.artists.artists.forEach(artist => artists.push(Object.assign({}, state.artists.artistsByName[artist])))
  return artists
}

export const selectArtistsNames = state => state.artists.artists.slice()

export const selectArtistForm = state => ({
  errors: { form: state.artists.serverErrors.join('\n') },
  isLoading: state.artists.isLoading,
  formOpen: state.artists.formOpen,
})

export const selectLine = (state, id) => {
  if (state.lines.linesById[id]) return Object.assign({}, state.lines.linesById[id])
  return null
}

export const selectLines = (state) => {
  const lines = []
  state.lines.lines.forEach(id => lines.push(Object.assign({}, state.lines.linesById[id])))
  return lines
}

export const selectLineForm = state => ({
  errors: { form: state.lines.serverErrors.join('\n') },
  isLoading: state.lines.isLoading,
  formOpen: state.lines.formOpen,
})
