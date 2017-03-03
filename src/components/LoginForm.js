import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { selectLogin } from '../store/selectors'
import { validateLoginInput } from '../shared/validations'
import { userLoginStart } from '../store/navigation/actions'

const loginFormInputs = [
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

export class LoginForm extends Component {
  static propTypes = {
    dispatchUserLogin: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,  // eslint-disable-line
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoading, dispatchUserLogin, errors } = this.props
    return (
      <Form
        onSubmit={dispatchUserLogin}
        errors={errors}
        isLoading={isLoading}
        inputs={loginFormInputs}
        title="Login"
        validationFunc={validateLoginInput}
        standalone
        submitText="Login"
      />
    )
  }
}

const mapStateToProps = state => selectLogin(state)

export default connect(mapStateToProps, { dispatchUserLogin: userLoginStart })(LoginForm)
