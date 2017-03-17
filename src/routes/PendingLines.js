import React, { Component } from 'react'
import LinesList from '../components/LinesList'

export default class PendingLines extends Component {
  render() {
    return (
      <LinesList displayLineStatus={false} />
    )
  }
}
