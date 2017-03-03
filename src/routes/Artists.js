import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArtistRow from '../components/ArtistRow'
import AddItemRow from '../components/AddItemRow'
import Form from '../components/Form'
import { selectArtists, selectArtistForm } from '../store/selectors'
import { artistsFetchStart, artistsCreateStart } from '../store/data/actions'
import { validateArtistInput } from '../shared/validations'

export const artistsFormInputs = [
  {
    name: 'name',
    label: 'Artist Name',
  },
  {
    name: 'url',
    label: 'URL',
  },
]

export class Artists extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    artistForm: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      errors: PropTypes.objectOf(PropTypes.string).isRequired,
      formOpen: PropTypes.bool.isRequired,
    }).isRequired,
    fetchArtists: PropTypes.func.isRequired,
    createArtists: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchArtists()
  }

  onAddRow = (name, url) => {
    this.props.createArtists(name, url)
  }

  render() {
    const { errors, isLoading, formOpen } = this.props.artistForm
    return (
      <div className="ui relaxed divided list">
        {
            this.props.artists.map(artist => <ArtistRow key={artist.name} {...artist} />)
        }
        <AddItemRow formOpen={formOpen}>
          <Form onSubmit={this.onAddRow} errors={errors} isLoading={isLoading} inputs={artistsFormInputs} title="Add Artists" validationFunc={validateArtistInput} />
        </AddItemRow>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  artists: selectArtists(state),
  artistForm: selectArtistForm(state),
})

export default connect(mapStateToProps, {
  fetchArtists: artistsFetchStart,
  createArtists: artistsCreateStart,
})(Artists)
