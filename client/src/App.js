import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Search from './components/search/Search';
import Summoner from './components/summoner/Summoner';

export default class App extends Component {
  render() {
    return (
      <div className="stats-app">
        <div className="container-fluid">
          <Router>
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/summoner/:region/:summonerName" component={Summoner} />
              <Route exact render={() => <h1>Page Not Found</h1>} />
            </Switch>
          </Router>
        </div>
        <p className="footer">
          <span>This application is a coding example written by <strong>Alex Saunders</strong> for the <strong>Battlefy</strong> interview process.</span>
        </p>
      </div>
    );
  }
}