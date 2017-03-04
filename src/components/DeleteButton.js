import React, { PropTypes } from 'react'

export default function DeleteButton({ onClick }) {
  return (
    <div className="">
      <button className="button--simple button--gray" type="button" onClick={onClick}><i className="large trash icon" /></button>
    </div>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
