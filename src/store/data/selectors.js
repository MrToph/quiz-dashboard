export const selectArtists = (state) => {
  const artists = []
  state.artists.artists.forEach(artist => artists.push(Object.assign({}, state.artists.artistsByName[artist])))
  return artists
}
