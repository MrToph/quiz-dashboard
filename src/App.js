import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TabBar from './components/TabBar'
import PrivateRoute from './routes/PrivateRoute'
import LoginRoute from './routes/Login'
import SignupRoute from './routes/Signup'
import SongsRoute from './routes/Songs'
import store from './store'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
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
        </Provider>
      </BrowserRouter>
    )
  }
}
