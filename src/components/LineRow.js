import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

export default function LineRow({ id, text, artist, songTitle }) {
  return (
    <div className="item">
      <img className="ui avatar image" src="http://semantic-ui.com/images/avatar2/small/rachel.png" alt="avatar" />
      <div className="content">
        <Link className="header" to={`/lines/${id}`}>{`${artist} - ${songTitle}`}</Link>
        <div className="description">{text}</div>
      </div>
    </div>
  )
}

LineRow.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired,
}
