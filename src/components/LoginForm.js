import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { selectLogin } from '../store/selectors'
import FormTextField from './FormTextField'
import validateInput from '../shared/validations/login'
import { userLoginStart } from '../store/navigation/actions'
import './LoginForm.css'

export class LoginForm extends Component {
  static propTypes = {
    dispatchUserLogin: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,  // eslint-disable-line
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    errors: {},
    username: '',
    password: '',
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
      const { username, password } = this.state
      this.props.dispatchUserLogin(username, password)
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: undefined },
    })
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  render() {
    const { username, password, errors } = this.state
    const { isLoading } = this.props
    return (
      <form className={classnames('LoginForm ui large form stacked segment', { error: Object.keys(errors).length > 0, loading: isLoading })} onSubmit={this.onSubmit}>
        <h2>Login</h2>
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
        <button className="ui primary submit button" type="submit">Login</button>
        { errors.form && <span className="ui error message">{errors.form}</span> }
      </form>
    )
  }
}

const mapStateToProps = state => selectLogin(state)

export default connect(mapStateToProps, { dispatchUserLogin: userLoginStart })(LoginForm)
