import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from '../components/Form'
import { selectArtist, selectArtistForm } from '../store/selectors'
import { artistSingleFetchStart, artistUpdateStart } from '../store/data/actions'
import { validateArtistInput } from '../shared/validations'
import { artistsFormInputs } from './Artists'

export class ArtistInfo extends Component {
  static propTypes = {
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    artistForm: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      errors: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    fetchArtist: PropTypes.func.isRequired,
    editArtist: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line
  }

  componentWillMount() {
    this.props.fetchArtist(this.getArtistName())
  }

  onEditRow = (name, url) => {
    const oldName = this.getArtistName()
    if (oldName) this.props.editArtist(oldName, name, url)
  }

  getArtistName = () => this.props.match.params.artistName

  render() {
    const { errors, isLoading } = this.props.artistForm
    if (!isLoading && !this.props.artist) {
      return (
        <span className="ui error message">{`The artist "${this.getArtistName()}" does not exist.`}</span>
      )
    }
    return (
      <Form onSubmit={this.onEditRow} errors={errors} isLoading={isLoading} inputs={artistsFormInputs} values={this.props.artist} title="Edit Artist" validationFunc={validateArtistInput} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  artist: selectArtist(state, ownProps.match.params.artistName),
  artistForm: selectArtistForm(state),
})


export default connect(mapStateToProps, {
  fetchArtist: artistSingleFetchStart,
  editArtist: artistUpdateStart,
})(ArtistInfo)
