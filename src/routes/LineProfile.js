import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Form from '../components/Form'
import { selectLine, selectLineForm, selectArtistsNames } from '../store/selectors'
import { artistsFetchStart } from '../store/data/actions/artists'
import { lineSingleFetchStart, linesUpdateStart, linesDeleteStart } from '../store/data/actions/lines'
import { validateLineInput } from '../shared/validations'
import { linesFormInputs } from './Active'

export class LineProfile extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    line: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    lineForm: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      errors: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    fetchArtists: PropTypes.func.isRequired,
    fetchLine: PropTypes.func.isRequired,
    editLine: PropTypes.func.isRequired,
    deleteLine: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line
  }

  state = {
    fetchStarted: false,
    initialFetchFinished: false,
  }

  componentWillMount() {
    this.props.fetchArtists()
    const lineId = this.getLineId()
    if (lineId) this.props.fetchLine(lineId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lineForm.isLoading) {
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
    const id = this.getLineId()
    if (id) this.props.deleteLine(id)
  }

  onEdit = (text, artist, songTitle, album, language, url, active) => {
    const lineId = this.getLineId()
    if (lineId) {
      this.props.editLine(lineId, text, artist, songTitle, album, language, url, active)
    }
  }

  getLineId = () => this.props.match.params.lineId

  render() {
    const { errors, isLoading } = this.props.lineForm
    const { initialFetchFinished } = this.state
    linesFormInputs.find(field => field.name === 'artist').allowedValues = this.props.artists

    if (initialFetchFinished && !this.props.line) {
      return (
        <Redirect to="/lines" />
      )
    }
    return (
      <Form
        onSubmit={this.onEdit}
        onDelete={this.onDelete}
        errors={errors}
        isLoading={isLoading}
        inputs={linesFormInputs}
        values={this.props.line}
        title="Edit Line"
        validationFunc={data => validateLineInput(data, this.props.artists)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  artists: selectArtistsNames(state),
  line: selectLine(state, ownProps.match.params.lineId),
  lineForm: selectLineForm(state),
})


export default connect(mapStateToProps, {
  fetchArtists: artistsFetchStart,
  fetchLine: lineSingleFetchStart,
  editLine: linesUpdateStart,
  deleteLine: linesDeleteStart,
})(LineProfile)
