import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

export default function ArtistRow({ name, url, children }) {
  return (
    <div className="item">
      <img className="ui avatar image" src="http://semantic-ui.com/images/avatar2/small/rachel.png" alt="avatar" />
      <div className="content">
        <Link className="header" to={`/artists/${name}`}>{name}</Link>
        <div className="description">
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </div>
      </div>
      {
        children
      }
    </div>
  )
}

ArtistRow.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
}
