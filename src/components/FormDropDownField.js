import React, { PropTypes } from 'react'

function getIconName(fieldName) {
  return fieldName === 'language' ? 'world' : 'users'
}

export default class FormDropDownField extends React.Component {
  onChangeWrapper = (selection) => {
    this.props.onChange(this.props.field, selection)
  }
  onRef = (ref) => {
    if (ref) {
        $(ref).dropdown({    // eslint-disable-line
          action: 'activate',   // http://semantic-ui.com/modules/dropdown.html#/usage => "Specifying Select Action"
          onChange: this.onChangeWrapper,
        })
    }
  }

  render() {
    const { field, allowedValues, label } = this.props
    const iconName = getIconName(field)
    return (
      <div ref={this.onRef} className="ui floating dropdown labeled search icon button">
        <input type="hidden" name={field} />
        <i className={`${iconName} icon`} />
        <span className="text">{label}</span>
        <div className="menu">
          {
            allowedValues.map(val => <div key={val} className="item">{val}</div>)
          }
        </div>
      </div>
    )
  }
}

FormDropDownField.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  allowedValues: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
}
