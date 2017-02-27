import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../store/navigation/actions'

export class TabBar extends React.Component {
  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
  }

  onLogout = () => {
    this.props.dispatchLogout()
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <a className="active item">
            Active Songs
        </a>
        <a className="item">
            Pending Songs
        </a>
        <a className="item">
            Artists
        </a>
        <div className="right menu">
          <div className="item">
            <button className="ui primary button" onClick={this.onLogout}>Log out</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { dispatchLogout: userLogout })(TabBar)
