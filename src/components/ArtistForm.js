import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import FormTextField from './FormTextField'
import { validateArtistInput } from '../shared/validations/login'
import './Form.css'

export default class ArtistForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    errors: {},
    name: '',
    url: '',
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.isValid()) {
      this.setState({
        errors: {},
      })
      const { name, url } = this.state
      this.props.onSubmit(name, url)
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: undefined },
    })
  }

  isValid = () => {
    const { errors, isValid } = validateArtistInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  render() {
    const { name, url, errors } = this.state
    console.log(errors)
    return (
      <form className={classnames('ui form green segment')} onSubmit={this.onSubmit}>
        <h4>Add Artist</h4>
        <FormTextField
          field="name"
          label="Artist Name"
          error={errors.name}
          value={name}
          onChange={this.onChange}
        />
        <FormTextField
          field="url"
          label="URL"
          error={errors.url}
          value={url}
          onChange={this.onChange}
        />
        <button className="ui positive submit button" type="submit">Save</button>
        { errors.form && <span className="ui error message">{errors.form}</span> }
      </form>
    )
  }
}

