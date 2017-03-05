import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default function FormTextField({ field, value, label, error, type, onChange }) {
  return (
    <div className={classnames('field', { error })}>
      <label htmlFor={field}>{label}</label>
      {
        type === 'select' &&
        <div className="ui compact selection dropdown">
          <i className="dropdown icon" />
          <div className="text">Compact</div>
          <div className="menu">
            <div className="item">A</div>
            <div className="item">B</div>
            <div className="item">C</div>
          </div>
        </div>
      }
      {
        type === 'textarea' &&
          <textarea name={field} placeholder={label} onChange={onChange} value={value} rows="5" />
      }
      {
         !(type === 'textarea' || type === 'select') &&
         <input type={type} name={field} placeholder={label} onChange={onChange} value={value} />
      }
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
