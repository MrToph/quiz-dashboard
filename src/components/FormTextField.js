import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default function FormTextField({ field, value, label, error, type, onChange }) {
  return (
    <div className={classnames('field', { error })}>
      <label htmlFor={field}>{label}</label>
      <input type={type} name={field} placeholder={label} onChange={onChange} value={value} />
      { error && <span className="ui error message visible">{error}</span> }
    </div>
  )
}

FormTextField.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

FormTextField.defaultProps = {
  type: 'text',
}
