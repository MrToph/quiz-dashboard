import React, { Component, PropTypes } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { selectIsLoggedIn } from '../store/selectors'

export class LoginRoute extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired, // eslint-disable-line
    isLoggedIn: PropTypes.bool.isRequired,
  }
  render() {
    const { from } = this.props.location.state || { from: '/' }

    if (this.props.isLoggedIn) return (<Redirect to={from} />)
    return (
      <div>
        <LoginForm />
        <Link to="/signup">No account? Sign up!</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
})

export default connect(mapStateToProps)(LoginRoute)
