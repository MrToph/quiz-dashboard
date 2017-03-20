import React, { PropTypes } from 'react'
import ArtistRow from './ArtistRow'

export default function ArtistSelectionRow({ onToggle, checked, ...artistProps }) {
  const { name } = artistProps
  return (
    <ArtistRow {...artistProps}>
      <div className="right floated content">
        <input type="checkbox" name="artists[]" value={name} checked={!!checked} onChange={() => onToggle(name)} />
      </div>
    </ArtistRow>
  )
}

ArtistSelectionRow.propTypes = {
  name: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  checked: PropTypes.bool,
}
