import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Summoner.css';

import SearchBar from '../search/SearchBar';
import MatchSummary from './MatchSummary';
import { findSummoner } from '../../lib/summonerService';

export default class Summoner extends Component {

  state = {
    isLoading: true,
    summoner: null,
    matches: null
  }

  async loadSummoner(region, username) {
    try {
      const data = await findSummoner(region, username);
      document.title = `${data.summoner.name} | Summoner Stats`;
      this.setState({ summoner: data.summoner, matches: data.matches, isLoading: false });
    } catch (err) {
      this.setState({ summoner: null, matches: null, errorMessage: 'Could not load this summoner.', isLoading: false });
    }
  }

  componentDidMount() {
    this.loadSummoner(this.props.match.params.region, this.props.match.params.summonerName);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillReceiveProps(newProps) {
    this.setState({ summoner: null, matches: null, isLoading: true });
    this.loadSummoner(newProps.match.params.region, newProps.match.params.summonerName);
  }

  avatarStyle = () => {
    return {
      backgroundImage: `url('http://ddragon.leagueoflegends.com/cdn/8.15.1/img/profileicon/${this.state.summoner.profileIconId}.png`
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <SearchBar {...this.props} />
          <p className="text-center my-5">
            <em>
              Loading...
              </em>
          </p>
        </div>);
    }

    if (!this.state.summoner) {
      return (
        <div>
          <SearchBar {...this.props} />
          <h1>Summoner Not Found</h1>
          <p>We could not locate the Summoner you're looking for in this region...</p>
          <p><Link to="/">Head home and try again?</Link></p>
        </div>
      );
    }

    return (
      <div>
        <SearchBar {...this.props} />
        <div className="summoner-info">
          <div className="summoner-avatar mr-3 mr-md-4" style={this.avatarStyle()}>
            <div className="summoner-level">{this.state.summoner.summonerLevel}</div>
          </div>
          <h1 className="d-none d-md-block mb-0">{this.state.summoner.name}</h1>
          <h3 className="d-md-none mb-0">{this.state.summoner.name}</h3>
        </div>
        {this.state.matches.length > 0 &&
          <div className="recent-history">
            <h3 className="d-none d-md-block mb-0">Recent Matches</h3>
            <h4 className="d-md-none mb-0">Recent Matches</h4>
            <div className="row">
              {this.state.matches.map(match => <MatchSummary key={match.gameId} summoner={this.state.summoner} {...match} />)}
            </div>
          </div>}
        {this.state.matches.length === 0 && <h2>No Recent Matches!</h2>}
      </div>
    );
  }
}