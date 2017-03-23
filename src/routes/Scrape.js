import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArtistSelectionRow from '../components/ArtistSelectionRow'
import { selectArtists } from '../store/selectors'
import { artistsFetchStart } from '../store/data/actions/artists'
import { scrapeLinesByPopularityStart, scrapeLinesSinceDateStart } from '../store/data/actions/lines'
import { dateToInputFormat } from '../utils'

export class Scrape extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    fetchArtists: PropTypes.func.isRequired,
    scrapeLinesByPopularity: PropTypes.func.isRequired,
    scrapeLinesSinceDate: PropTypes.func.isRequired,
  }

  state = {
    allChecked: false,
    numberOfSongsToParse: '30',
    dateToParseFrom: dateToInputFormat(new Date()),
    artistInputs: {},
  }

  componentDidMount() {
    this.props.fetchArtists()
  }

  onArtistCheckboxToggle = (name) => {
    this.setState({
      artistInputs: {
        ...this.state.artistInputs,
        [name]: !this.state.artistInputs[name],
      },
    })
  }

  onAllCheckToggle = () => {
    const newChecked = !this.state.allChecked
    this.setState({
      allChecked: newChecked,
    })
    const artistInputs = this.props.artists.map(artistObj => artistObj.name).reduce((memo, name) => ({ ...memo, [name]: newChecked }), {})
    this.setState({
      artistInputs,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
  }

  onParsePopularSongsClick = () => {
    const artistsToCheck = this.getArtistToCheck()
    const { numberOfSongsToParse } = this.state
    this.props.scrapeLinesByPopularity(artistsToCheck, numberOfSongsToParse)
  }

  onParseSongsFromDate = () => {
    const artistsToCheck = this.getArtistToCheck()
    const { dateToParseFrom } = this.state
    this.props.scrapeLinesSinceDate(artistsToCheck, dateToParseFrom)
  }

  getArtistToCheck = () => {
    const artistsToCheck = Object.keys(this.state.artistInputs)
    return artistsToCheck.filter(name => this.state.artistInputs[name])
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="ui relaxed divided list">
          {
            this.props.artists.map(artist => <ArtistSelectionRow key={artist.name} checked={this.state.artistInputs[artist.name]} onToggle={this.onArtistCheckboxToggle} {...artist} />)
        }
          <div className="item">
            <div className="right floated content">
              <input type="checkbox" name="artists[]" value={name} checked={this.state.allChecked} onChange={this.onAllCheckToggle} />
            </div>
          </div>
        </div>
        <div>{'Parse top '}
          <input name="numberOfSongsToParse" value={this.state.numberOfSongsToParse} onChange={this.handleInput} maxLength="3" size="3" />
          {' popular songs. '}
          <button onClick={this.onParsePopularSongsClick}>OK</button>
        </div>
        <div>{'Parse songs released after '}
          <input type="date" name="dateToParseFrom" value={this.state.dateToParseFrom} onChange={this.handleInput} />
          {'. '}
          <button onClick={this.onParseSongsFromDate}>OK</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  artists: selectArtists(state),
})

export default connect(mapStateToProps, {
  fetchArtists: artistsFetchStart,
  scrapeLinesByPopularity: scrapeLinesByPopularityStart,
  scrapeLinesSinceDate: scrapeLinesSinceDateStart,
})(Scrape)
