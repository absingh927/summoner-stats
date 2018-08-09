import React, { Component } from 'react';
import './Search.css';

import SearchForm from './SearchForm';

export default class Search extends Component {
  render() {
    return (
      <div className="content">
        <div className="details">
          <h1>Your Stats. Streamlined.</h1>
          <p className="greetings">Greetings, Summoner...</p>
          <p>Select your desired <strong>Region</strong> and give us your <strong>Summoner Name</strong> to view your recent League of Legends match history.</p>
          <SearchForm {...this.props} />
        </div>
      </div>
    );
  }
}