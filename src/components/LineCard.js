import React, { PropTypes } from 'react'
import './LineCard.css'

export default function LineCard({
  text,
  artist,
  songTitle,
  album,
  language,
  moreUrl,
  thumbnail,
}) {
  return (
    <div className="lineCard ui cards">
      <div className="noselect card">
        <div className="content">
          <img
            className="right floated mini ui image"
            src={thumbnail}
            alt="Song Thumb"
          />
          <div className="header">{`${artist} - ${songTitle}`}</div>
          <div className="meta">{`${album || ''} (${language})`}</div>
          <div className="lineCard--text left floated description">{text}</div>
        </div>
        <div className="lineCard--url">
          <a target="_blank" rel="noopener noreferrer" href={moreUrl}>
            {moreUrl}
          </a>
        </div>
      </div>
    </div>
  )
}

LineCard.propTypes = {
  text: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired,
  album: PropTypes.string,
  language: PropTypes.string.isRequired,
  moreUrl: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
}
