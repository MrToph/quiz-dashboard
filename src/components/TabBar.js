import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import classnames from 'classnames'
import { userLogout } from '../store/navigation/actions'
import './TabBar.css'

export class TabBar extends React.Component {
  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,  // eslint-disable-line
  }

  onLogout = () => {
    this.props.dispatchLogout()
  }

  render() {
    const path = this.props.location.pathname || '/'
    return (
      <div className="ui menu tabBar">
        <Link className={classnames('item', { active: path === '/' })} to="/">Active Songs</Link>
        <Link className={classnames('item', { active: path === '/pending' })} to="/pending">Pending Songs</Link>
        <Link className={classnames('item', { active: path === '/artists' })} to="/artists">Artists</Link>
        <div className="right menu">
          <div className="item">
            <button className="ui primary button" onClick={this.onLogout}>Log out</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, { dispatchLogout: userLogout })(TabBar))
