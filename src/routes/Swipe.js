import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LinesSwipeCards from '../components/LinesSwipeCards'
import { linesFetchStart, lineJudgeStart, lineJudgeSkip } from '../store/data/actions/lines'
import { selectLines, selectLineForm, selectHasMoreLines } from '../store/selectors'

export class Swipe extends Component {
  static propTypes = {
    hasMoreLines: PropTypes.bool.isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
    lineForm: PropTypes.shape({
      errors: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    fetchLinesByStatus: PropTypes.func.isRequired,
    judgeLine: PropTypes.func.isRequired,
    skipLine: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchLinesByStatus(false, true)
  }

  onSwipe = (swipeAction, lineId) => {
    const { hasMoreLines, lines } = this.props
    if (lines.length <= 2 && hasMoreLines) this.props.fetchLinesByStatus(false)

    if (swipeAction === 'bottom') this.props.skipLine(lineId)
    else if (swipeAction === 'left' || swipeAction === 'right') this.props.judgeLine(lineId, swipeAction === 'right')
  }

  render() {
    const { lines, hasMoreLines, lineForm } = this.props
    const { errors, isLoading } = lineForm
    const { form } = errors

    if (form) {
      return (
        <span className="ui error message">{form}</span>
      )
    }

    if (lines.length === 0 && !isLoading && !hasMoreLines) {
      return (
        <div>
            No more lines.
        </div>
      )
    }

    return (
      <LinesSwipeCards lines={lines} onSwipe={this.onSwipe} />
    )
  }
}

const mapStateToProps = state => ({
  lines: selectLines(state, false),
  lineForm: selectLineForm(state),
  hasMoreLines: selectHasMoreLines(state),
})

export default connect(mapStateToProps, {
  fetchLinesByStatus: linesFetchStart,
  judgeLine: lineJudgeStart,
  skipLine: lineJudgeSkip,
})(Swipe)
