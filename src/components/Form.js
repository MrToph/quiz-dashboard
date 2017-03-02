import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import FormTextField from './FormTextField'
import './Form.css'

export default class Form extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    validationFunc: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,  // eslint-disable-line
    isLoading: PropTypes.bool,  // eslint-disable-line
    inputs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
    }).isRequired).isRequired,
  }

  constructor(props) {
    super(props)
    const state = {
      errors: {},
      isLoading: false,
    }
    props.inputs.forEach((input) => { state[input.name] = '' })  // store text field values
    this.state = state
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: {
        ...this.state.errors, ...nextProps.errors,
      },
      isLoading: nextProps.isLoading,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.isValid()) {
      this.setState({
        errors: {},
      })

      // call onSubmit in the same order they were passed in this.props.inputs
      const args = []
      this.props.inputs.forEach((input) => { args.push(this.state[input.name]) })
      this.props.onSubmit(...args)
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: undefined },
    })
  }

  isValid = () => {
    const { errors, isValid } = this.props.validationFunc(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  render() {
    const { title, inputs } = this.props
    const { errors, isLoading } = this.state
    return (
      <form className={classnames('ui form green segment', { error: Object.keys(errors).length > 0, loading: isLoading })} onSubmit={this.onSubmit}>
        <h4>{ title }</h4>
        {
            inputs.map(input => <FormTextField
              key={input.name}
              field={input.name}
              label={input.label}
              type={input.type}
              error={errors[input.name]}
              value={this.state[input.name]}
              onChange={this.onChange}
            />)
        }
        <button className="ui positive submit button" type="submit">Save</button>
        { errors.form && <span className="ui error message">{errors.form}</span> }
      </form>
    )
  }
}

