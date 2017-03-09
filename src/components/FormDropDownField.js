/* global $ */
import React, { PropTypes } from 'react'

function getIconName(fieldName) {
  return fieldName === 'language' ? 'world' : 'users'
}

export default class FormDropDownField extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      $(this.ref).dropdown('set selected', nextProps.value)
    }
  }

  onRef = (ref) => {
    if (ref) {
      this.ref = ref
      $(ref).dropdown({
        action: 'activate',   // http://semantic-ui.com/modules/dropdown.html#/usage => "Specifying Select Action"
        onChange: this.onChangeWrapper,
      })
      .dropdown('set selected', this.props.value)
    }
  }

  onChangeWrapper = (selection) => {
    this.props.onChange(this.props.name, selection)
  }

  render() {
    const { name, allowedValues, label } = this.props
    const iconName = getIconName(name)
    return (
      <div ref={this.onRef} className="ui floating dropdown labeled search icon button">
        <input type="hidden" name={name} />
        <i className={`${iconName} icon`} />
        <span className="text">{label}</span>
        <div className="menu">
          {
            allowedValues.map(val => <div key={val} data-value={val} className="item">{val}</div>)
          }
        </div>
      </div>
    )
  }
}

FormDropDownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  allowedValues: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
}
