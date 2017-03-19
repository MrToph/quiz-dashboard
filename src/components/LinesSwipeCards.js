import React, { PropTypes } from 'react'
import Cards, { Card } from 'react-swipe-card'
import LineCard from './LineCard'
import './LinesSwipeCards.css'

export default function LinesSwipeCards({ lines, onSwipe }) {
  return (
    <Cards onEnd={() => onSwipe('end')} alertLeft="Discarded" alertRight="Activated" alertBottom="Skipped" className="swipeCardContainer">
      {
        lines.map(line =>
          <Card
            onSwipeLeft={() => onSwipe('left', line.id)}
            onSwipeRight={() => onSwipe('right', line.id)}
            onSwipeBottom={() => onSwipe('bottom', line.id)}
            key={line.id}
          >
            <LineCard {...line} />
          </Card>)
    }
    </Cards>
  )
}

LinesSwipeCards.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onSwipe: PropTypes.func.isRequired,
}
