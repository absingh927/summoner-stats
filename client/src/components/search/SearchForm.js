import React, { Component } from 'react';
import './SearchForm.css';
import { isValidSummonerName } from '../../lib/summonerHelpers';

export default class SearchForm extends Component {

  state = {
    summonerName: this.props.match.params.summonerName || '',
    region: this.props.match.params.region || 'NA1'
  }

  // Event Handlers
  handleNameChanged = (evt) => {
    // Only show the error if there is input.
    let errorMessage = null;
    if (evt.target.value.length > 0 && !isValidSummonerName(evt.target.value)) {
      errorMessage = 'Please enter a valid Summoner Name';
    }

    this.setState({ summonerName: evt.target.value, errorMessage: errorMessage });
  }

  handleRegionChanged = (evt) => this.setState({ region: evt.target.value });

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (!isValidSummonerName(this.state.summonerName)) {
      // Don't continue if we don't have a valid summoner name.
      return;
    }

    // Redirect to the summoner page.
    this.props.history.push(`/summoner/${this.state.region}/${encodeURIComponent(this.state.summonerName)}`)
  }

  render() {
    return (
      <div className="search-form">
        {this.state.errorMessage && <span className="error-message">{this.state.errorMessage}</span>}
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <select className="form-control summoner-search my-1 mr-sm-2" onChange={this.handleRegionChanged} value={this.state.region}>
            <option value="BR1">BR</option>
            <option value="EUN1">EUNE</option>
            <option value="JP1">JP</option>
            <option value="KR">KR</option>
            <option value="LA1">LAN</option>
            <option value="LA2">LAS</option>
            <option value="NA1">NA</option>
            <option value="OC1">OCE</option>
            <option value="TR1">TR</option>
            <option value="RU">RU</option>
            <option value="PBE1">PBE</option>
          </select>
          <input className="form-control summoner-search my-1 mr-sm-2" type="text" onChange={this.handleNameChanged} placeholder="Summoner Name" value={this.state.summonerName} />
          <button className="btn btn-large my-1 search-btn" type="submit">Search</button>
        </form>
      </div>
    );
  }
}