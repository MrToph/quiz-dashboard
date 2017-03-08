import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LineRow from '../components/LineRow'
import AddItemRow from '../components/AddItemRow'
import Form from '../components/Form'
import { selectArtistsNames, selectLines, selectLineForm } from '../store/selectors'
import { artistsFetchStart } from '../store/data/actions/artists'
import { linesFetchStart, linesCreateStart } from '../store/data/actions/lines'
import { validateLineInput } from '../shared/validations'

export const linesFormInputs = [
  {
    name: 'text',
    label: 'Line',
    type: 'textarea',
  },
  {
    name: 'artist',
    label: 'Artist Name',
    type: 'select',
    allowedValues: [],  // will be loaded
  },
  {
    name: 'songTitle',
    label: 'Song title',
  },
  {
    name: 'album',
    label: 'Album Name',
  },
  {
    name: 'language',
    label: 'Language',
    type: 'select',
    allowedValues: ['de', 'en'],
  },
  {
    name: 'moreUrl',
    label: 'More-URL',
  },
  {
    name: 'active',
    label: 'Active',
    type: 'checkbox',
  },
]

export class Lines extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
    lineForm: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      errors: PropTypes.objectOf(PropTypes.string).isRequired,
      formOpen: PropTypes.bool.isRequired,
    }).isRequired,
    fetchArtists: PropTypes.func.isRequired,
    fetchLines: PropTypes.func.isRequired,
    createLine: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchArtists()
    this.props.fetchLines()
  }

  onAddRow = (text, artist, songTitle, album, language, url, active) => {
    this.props.createLine(text, artist, songTitle, album, language, url, active)
  }

  render() {
    const { errors, isLoading, formOpen } = this.props.lineForm
    linesFormInputs.find(field => field.name === 'artist').allowedValues = this.props.artists
    return (
      <div className="ui relaxed divided list">
        {
            this.props.lines.map(line => <LineRow key={line.id} {...line} />)
        }
        <AddItemRow formOpen={formOpen}>
          <Form
            onSubmit={this.onAddRow}
            errors={errors}
            isLoading={isLoading}
            inputs={linesFormInputs}
            title="Add Line"
            validationFunc={data => validateLineInput(data, this.props.artists)}
          />
        </AddItemRow>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  artists: selectArtistsNames(state),
  lines: selectLines(state),
  lineForm: selectLineForm(state),
})

export default connect(mapStateToProps, {
  fetchArtists: artistsFetchStart,
  fetchLines: linesFetchStart,
  createLine: linesCreateStart,
})(Lines)
