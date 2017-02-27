import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArtistRow from '../components/ArtistRow'
import AddItemRow from '../components/AddItemRow'
import ArtistForm from '../components/ArtistForm'
import { selectArtists } from '../store/selectors'

export class Artists extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  }

  onAddRow = (...args) => {
    console.log(...args)
  }

  render() {
    return (
      <div className="ui relaxed divided list">
        {
            this.props.artists.map(artist => <ArtistRow key={artist.name} {...artist} />)
        }
        <AddItemRow onClick={this.onAddRow}>
          <ArtistForm />
        </AddItemRow>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  artists: selectArtists(state),
})

export default connect(mapStateToProps)(Artists)
