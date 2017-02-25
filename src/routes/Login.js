import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

export default class LoginRoute extends Component {
  render() {
    return (
      <div>
        <LoginForm />
        <Link to="/signup">No account? Sign up!</Link>
      </div>
    )
  }
}
