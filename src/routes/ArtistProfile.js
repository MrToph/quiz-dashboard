import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Form from '../components/Form'
import { selectArtist, selectArtistForm } from '../store/selectors'
import { artistSingleFetchStart, artistUpdateStart, artistDeleteStart } from '../store/data/actions'
import { validateArtistInput } from '../shared/validations'
import { artistsFormInputs } from './Artists'

export class ArtistProfile extends Component {
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
    deleteArtist: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line
  }

  state = {
    fetchStarted: false,
    initialFetchFinished: false,
  }

  componentWillMount() {
    this.props.fetchArtist(this.getArtistName())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artistForm.isLoading) {
      this.setState({
        fetchStarted: true,
      })
    } else if (this.state.fetchStarted) { /* !nextProps.isLoading && fetchStarted <=> fetch started and now not loading anymore */
      this.setState({
        initialFetchFinished: true,
      })
    }
  }

  onDelete = () => {
    const oldName = this.getArtistName()
    if (oldName) this.props.deleteArtist(oldName)
  }

  onEdit = (name, url) => {
    const oldName = this.getArtistName()
    if (oldName) this.props.editArtist(oldName, name, url)
  }

  getArtistName = () => this.props.match.params.artistName

  render() {
    const { errors, isLoading } = this.props.artistForm
    const { initialFetchFinished } = this.state
    if (initialFetchFinished && !this.props.artist) {
      return (
        <Redirect to="/artists" />
      )
    }
    return (
      <Form
        onSubmit={this.onEdit}
        onDelete={this.onDelete}
        errors={errors}
        isLoading={isLoading}
        inputs={artistsFormInputs}
        values={this.props.artist}
        title="Edit Artist"
        validationFunc={validateArtistInput}
      />
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
  deleteArtist: artistDeleteStart,
})(ArtistProfile)
