import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import TabBar from './components/TabBar'
import PrivateRoute from './routes/PrivateRoute'
import LoginRoute from './routes/Login'
import SignupRoute from './routes/Signup'
import SongsRoute from './routes/Songs'
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
        <TabBar />
        <h2>Quiz Dashboard</h2>
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/signup" component={SignupRoute} />
          <PrivateRoute exact path="/" component={SongsRoute} />
          <PrivateRoute component={SongsRoute} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, { dispatchAppStarted: createAppStarted })(App)
