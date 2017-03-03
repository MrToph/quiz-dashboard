import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

export default function ArtistRow({ name, url }) {
  return (
    <div className="item">
      <img className="ui avatar image" src="http://semantic-ui.com/images/avatar2/small/rachel.png" alt="avatar" />
      <div className="content">
        <Link className="header" to={`/artists/${name}`}>{name}</Link>
        <div className="description">{url}</div>
      </div>
    </div>
  )
}

ArtistRow.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
