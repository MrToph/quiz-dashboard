import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import TabBar from './components/TabBar'
import LoginRoute from './routes/Login'
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
            <Route exact path="/login" component={LoginRoute} />
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}
