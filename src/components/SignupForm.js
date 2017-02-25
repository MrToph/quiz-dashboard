import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { selectSignup } from '../store/selectors'
import FormTextField from './FormTextField'
import { validateSignupInput } from '../shared/validations/login'
import { userSignupStart } from '../store/navigation/actions'
import './Form.css'

export class SignupForm extends Component {
  static propTypes = {
    dispatchUserSignup: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,  // eslint-disable-line
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    errors: {},
    username: '',
    password: '',
    email: '',
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: {
        ...this.state.errors, ...nextProps.errors,
      },
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.isValid()) {
      this.setState({
        errors: {},
      })
      const { username, password, email } = this.state
      this.props.dispatchUserSignup(username, password, email)
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: undefined },
    })
  }

  isValid = () => {
    const { errors, isValid } = validateSignupInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  render() {
    const { username, password, email, errors } = this.state
    const { isLoading } = this.props
    return (
      <form className={classnames('Form ui large form stacked segment', { error: Object.keys(errors).length > 0, loading: isLoading })} onSubmit={this.onSubmit}>
        <h2>Signup</h2>
        <FormTextField
          field="email"
          type="email"
          label="EMail"
          error={errors.email}
          value={email}
          onChange={this.onChange}
        />
        <FormTextField
          field="username"
          label="Username"
          error={errors.username}
          value={username}
          onChange={this.onChange}
        />
        <FormTextField
          field="password"
          type="password"
          label="Password"
          error={errors.password}
          value={password}
          onChange={this.onChange}
        />
        <button className="ui primary submit button" type="submit">Signup</button>
        { errors.form && <span className="ui error message">{errors.form}</span> }
      </form>
    )
  }
}

const mapStateToProps = state => selectSignup(state)

export default connect(mapStateToProps, { dispatchUserSignup: userSignupStart })(SignupForm)
