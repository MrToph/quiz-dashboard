import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import FormTextField from './FormTextField'
import DeleteButton from './DeleteButton'
import './Form.css'

export default class Form extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    submitText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    validationFunc: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,  // eslint-disable-line
    isLoading: PropTypes.bool,  // eslint-disable-line
    standalone: PropTypes.bool, // if set styles this component differently
    inputs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
    }).isRequired).isRequired,
    values: PropTypes.objectOf(PropTypes.string.isRequired),
  }

  static defaultProps = {
    standalone: false,
    submitText: 'Save',
  }

  constructor(props) {
    super(props)
    let state = {
      errors: {},
      isLoading: false,
    }
    props.inputs.forEach((input) => { state[input.name] = '' })  // store text field values
    state = {
      ...state,
      ...props.values,
    }
    this.state = state
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: {
        ...this.state.errors, ...nextProps.errors,
      },
      isLoading: nextProps.isLoading,
    })
    if (nextProps.values !== this.props.values) {
      this.setState({
        ...nextProps.values,
      })
    }
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
    const { title, inputs, standalone, submitText, onDelete } = this.props
    const { errors, isLoading } = this.state
    return (
      <form
        className={classnames('ui form segment', {
          error: Object.keys(errors).length > 0,
          loading: isLoading,
          green: !standalone,
          stacked: standalone,
        })} onSubmit={this.onSubmit}
      >
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
        <div className="buttonContainer">
          <button
            className={classnames('ui submit button', {
              positive: !standalone,
              primary: standalone,
            })}
            type="submit"
          >{submitText}</button>
          {onDelete && <DeleteButton onClick={onDelete} />}
        </div>
        { errors.form && <span className="ui error message">{errors.form}</span> }
      </form>
    )
  }
}

