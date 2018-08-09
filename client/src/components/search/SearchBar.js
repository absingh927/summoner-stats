import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './SearchBar.css';
import SearchForm from './SearchForm';

class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <div className="row">
          <div className="col-12">
            <SearchForm {...this.props} />
          </div>
        </div>
      </div>
    )
  };
}

export default withRouter(SearchBar);