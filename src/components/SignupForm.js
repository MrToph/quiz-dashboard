import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { selectSignup } from '../store/selectors'
import { validateSignupInput } from '../shared/validations'
import { userSignupStart } from '../store/navigation/actions'

const signupFormInputs = [
  {
    name: 'email',
    type: 'email',
    label: 'EMail',
  },
  {
    name: 'username',
    label: 'Username',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
]

export class SignupForm extends Component {
  static propTypes = {
    dispatchUserSignup: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,  // eslint-disable-line
    isLoading: PropTypes.bool.isRequired,
  }

  onSubmit = (email, username, password) => {
    this.props.dispatchUserSignup(username, password, email)
  }

  render() {
    const { isLoading, errors } = this.props
    return (
      <Form
        onSubmit={this.onSubmit}
        errors={errors}
        isLoading={isLoading}
        inputs={signupFormInputs}
        title="Signup"
        validationFunc={validateSignupInput}
        standalone
        submitText="Signup"
      />
    )
  }
}

const mapStateToProps = state => selectSignup(state)

export default connect(mapStateToProps, { dispatchUserSignup: userSignupStart })(SignupForm)
