import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'

export default class SignupRoute extends Component {
  render() {
    return (
      <div>
        <SignupForm />
        <Link to="/login">Already have an account? Sign in!</Link>
      </div>
    )
  }
}
