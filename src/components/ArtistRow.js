import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default function ArtistRow({ name, url }) {
  return (
    <div className="item">
      <img className="ui avatar image" src="http://semantic-ui.com/images/avatar2/small/rachel.png" alt="avatar" />
      <div className="content">
        <a className="header">{name}</a>
        <div className="description">{url}</div>
      </div>
    </div>
  )
}

ArtistRow.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
