import React, { Component } from "react";
import './App.css';
import Dashboard from './Dashboard/dashboard';
import DashboardD3 from './Dashboard/dashboard-d3';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 0,
      userName: null
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-header-logo" src="https://tracktherecovery.org/img/oi-etrac-logo.e05d7c62.svg" />
        </header>
        <div className="App-Dashboard">
          <Router>
            <Switch>
              <Route path="/d3">
                <DashboardD3 />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
