import React, { PropTypes } from 'react'
import classnames from 'classnames'
import FormDropDownField from './FormDropDownField'

export default class FormField extends React.Component {
  onChangeWrapper = (event) => {
    if (this.props.type === 'checkbox') this.props.onChange(event.target.name, event.target.checked)
    else this.props.onChange(event.target.name, event.target.value)
  }

  render() {
    const { name, value, label, error, type } = this.props
    let fieldComponent
    switch (type) {
      case 'select': {
        fieldComponent = <FormDropDownField {...this.props} />
        break
      }
      case 'textarea': {
        fieldComponent = <textarea name={name} placeholder={label} onChange={this.onChangeWrapper} value={value} rows="5" />
        break
      }
      case 'checkbox': {
        fieldComponent = <input type={type} name={name} placeholder={label} onChange={this.onChangeWrapper} checked={value} />
        break
      }
      default: {
        fieldComponent = <input type={type} name={name} placeholder={label} onChange={this.onChangeWrapper} value={value} />
      }
    }
    return (
      <div className={classnames('field', { error })}>
        <label htmlFor={name}>{label}</label>
        {
          fieldComponent
        }
        { error && <span className="ui error message visible">{error}</span> }
      </div>
    )
  }
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

FormField.defaultProps = {
  type: 'text',
}
