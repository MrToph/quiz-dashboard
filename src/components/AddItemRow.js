import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './AddItemRow.css'

export default class AddItemRow extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    formOpen: PropTypes.bool.isRequired,  // eslint-disable-line
  }

  state = {
    formOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      formOpen: nextProps.formOpen,
    })
  }

  onToggle = () => {
    this.setState({
      formOpen: !this.state.formOpen,
    })
  }

  render() {
    const { children } = this.props
    const { formOpen } = this.state
    return (
      <div className="item">
        <div className="content">
          <button className="ui button circular icon button--no-style" onClick={this.onToggle}><i className={classnames('addItemRow-icon large green plus middle aligned icon', { rotate: formOpen })} /></button>
          {
              formOpen && children
          }
        </div>
      </div>
    )
  }
}
