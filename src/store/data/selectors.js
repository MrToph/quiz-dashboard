export const selectArtists = (state) => {
  const artists = []
  state.artists.artists.forEach(artist => artists.push(Object.assign({}, state.artists.artistsByName[artist])))
  return artists
}

export const selectArtistForm = state => ({
  errors: { form: state.artists.serverErrors.join('\n') },
  isLoading: state.artists.isLoading,
  formOpen: state.artists.formOpen,
})
