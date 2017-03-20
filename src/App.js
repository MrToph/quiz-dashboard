import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import TabBar from './components/TabBar'
import PrivateRoute from './routes/PrivateRoute'
import LoginRoute from './routes/Login'
import SignupRoute from './routes/Signup'
import ActiveRoute from './routes/ActiveLines'
import PendingRoute from './routes/PendingLines'
import SwipeRoute from './routes/Swipe'
import ArtistsRoute from './routes/Artists'
import ArtistProfile from './routes/ArtistProfile'
import LineProfile from './routes/LineProfile'
import ScrapeRoute from './routes/Scrape'
import Route404 from './routes/404'
import { createAppStarted } from './store/navigation/actions'
import './App.css'

export class App extends Component {
  static propTypes = {
    dispatchAppStarted: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.dispatchAppStarted()
  }

  render() {
    return (
      <div className="App">
        <h2>Quiz Dashboard</h2>
        <TabBar />
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/signup" component={SignupRoute} />
          <PrivateRoute exact path="/" component={ActiveRoute} />
          <PrivateRoute exact path="/pending" component={PendingRoute} />
          <PrivateRoute exact path="/swipe" component={SwipeRoute} />
          <PrivateRoute exact path="/lines/:lineId" component={LineProfile} />
          <PrivateRoute exact path="/artists" component={ArtistsRoute} />
          <PrivateRoute exact path="/artists/:artistName" component={ArtistProfile} />
          <PrivateRoute exact path="/scrape" component={ScrapeRoute} />
          <PrivateRoute component={Route404} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, { dispatchAppStarted: createAppStarted })(App)
