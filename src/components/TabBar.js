import React, { PropTypes } from 'react'

export default function TabBar(props) {
  return (
    <div className="ui menu">
      <a className="active item">
            Home
        </a>
      <a className="item">
            Messages
        </a>
      <div className="right menu">
        <div className="ui dropdown item">
            Language <i className="dropdown icon" />
          <div className="menu">
            <a className="item">English</a>
            <a className="item">Russian</a>
            <a className="item">Spanish</a>
          </div>
        </div>
        <div className="item">
          <div className="ui primary button">Sign Up</div>
        </div>
      </div>
    </div>
  )
}
