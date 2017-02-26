import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectIsLoggedIn } from '../store/selectors'

export class PrivateRoute extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
  }

  render() {
    const { isLoggedIn, component, ...rest } = this.props
    return (
      <Route {...rest} render={props => isLoggedIn ? React.createElement(component, props) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
})

export default connect(mapStateToProps)(PrivateRoute)
