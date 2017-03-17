import React, { Component } from 'react'
import LinesList from '../components/LinesList'

export default class ActiveLines extends Component {
  render() {
    return (
      <LinesList displayLineStatus />
    )
  }
}
