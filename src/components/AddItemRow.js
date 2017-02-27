import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './AddItemRow.css'

export default class AddItemRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  state = {
    formOpen: false,
  }

  onToggle = () => {
    this.setState({
      formOpen: !this.state.formOpen,
    })
  }

  onSubmit = () => {
    console.log()
    this.props.onClick()
  }

  render() {
    const { children } = this.props
    const { formOpen } = this.state
    return (
      <div className="item">
        <div className="content">
          <button className="ui button circular icon button--no-style" onClick={this.onToggle}><i className={classnames('addItemRow-icon large green plus middle aligned icon', { rotate: formOpen })} /></button>
          {
              formOpen && React.cloneElement(children, { onSubmit: this.onSubmit })
          }
        </div>
      </div>
    )
  }
}
