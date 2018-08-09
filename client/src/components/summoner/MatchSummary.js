import React, { Component } from 'react';
import './MatchSummary.css';

import {
  getParticipantIdForAccountId,
  getParticipant,
  getOutcome,
  getMatchDuration,
  getTimeAgo
} from '../../lib/matchSummaryHelper';

export default class MatchSummary extends Component {

  imageStyle = (path, ignoreVersion = false) => {
    return {
      backgroundImage: `url('http://ddragon.leagueoflegends.com/cdn/${ignoreVersion ? '' : '8.15.1/'}img/${path}`
    }
  }

  render() {

    const participantId = getParticipantIdForAccountId(this.props.summoner.accountId, this.props.participantIdentities);
    const participant = getParticipant(participantId, this.props.participants);
    const stats = participant.stats;
    const outcome = getOutcome(participant.participantId, this.props.participants, this.props.teams);

    return (
      <div className="col-12 col-sm-6 col-md-4 col-xl-3">
        <div className="match-summary">
          <div className="row flex-grow-1 justify-content-center">
            <div className="col-6 mb-2 d-flex flex-column justify-content-center align-items-center">
              <div className="champion-avatar" style={this.imageStyle(`champion/${this.props.champion.image.full}`)}></div>
              <span className="champion-name mt-2">{this.props.champion.name}</span>
              <span className="level">Level {stats.champLevel}</span>
            </div>
            <div className="col-6 mb-2 d-flex flex-column justify-content-center align-items-center">
              <span className={`outcome ${outcome.toLowerCase()} text-center`}>{outcome}</span>
              <span className="match-date text-center">
                {getTimeAgo(this.props.gameCreation)}
              </span>
              <span className="match-length text-center">
                {getMatchDuration(this.props.gameDuration)}
              </span>
            </div>
            <div className="col-3 mb-2 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                  <div className="spell" title={this.props.spell1.name} style={this.imageStyle(`spell/${this.props.spell1.image.full}`)}></div>
                  <div className="spell" title={this.props.primaryPerk.name} style={this.imageStyle(`${this.props.primaryPerk.icon}`, true)}></div>
                </div>
                <div className="d-flex flex-row">
                  <div className="spell" title={this.props.spell2.name} style={this.imageStyle(`spell/${this.props.spell2.image.full}`)}></div>
                  <div className="spell" title={this.props.perkSubStyle.name} style={this.imageStyle(`${this.props.perkSubStyle.icon}`, true)}></div>
                </div>
              </div>
            </div>
            <div className="col-4 mb-2 summoner-kda d-flex flex-column justify-content-center align-items-center">
              <span className="kda-stats">{stats.kills} / <span className="deaths">{stats.deaths}</span> / {stats.assists}</span>
              <span className="kda-stats">{Math.round((parseFloat(stats.kills + stats.assists) / parseFloat(stats.deaths)) * 100) / 100}:1 KDA</span>
              <span title={`minion ${stats.totalMinionsKilled} + monster ${stats.neutralMinionsKilled}`}>{stats.totalMinionsKilled + stats.neutralMinionsKilled} ({Math.round(parseFloat(stats.totalMinionsKilled + stats.neutralMinionsKilled) / (parseFloat(this.props.gameDuration) / 60) * 10) / 10}) CS</span>
            </div>
            <div className="col-5 d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-row">
                {this.props.items.slice(0, 4).map((item, ix) => item && <div key={ix} className="item" title={item.name} style={this.imageStyle(`item/${item.image.full}`)}></div>)}
              </div>
              <div className="d-flex flex-row">
                {this.props.items.slice(4).map((item, ix) => item && <div key={ix} className="item" title={item.name} style={this.imageStyle(`item/${item.image.full}`)}></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}