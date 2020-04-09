import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sort from './Sort.jsx';

import '../styles/ListHeader.styles.scss';
import AddRating from './AddRating.jsx';

class ListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searched: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  clearSearch() {
    this.setState({
      value: '',
      searched: false,
    });
    this.props.reset();
  }


  handleSubmit(event) {
    if (this.state.value === '') {
      this.setState({
        searched: false,
      });
    } else {
      this.setState({
        searched: true,
        query: this.state.value
      });
      this.props.searchHandle(this.state.value);
    }
    event.preventDefault();
  }

  render() {
    if (this.state.searched === false) {
      return (
        <div>
          <h3>Recommended Reviews</h3>
          <input type="text" className="searchBar" placeholder="Search within reviews" value={this.state.value} onChange={this.handleChange} />
          <button type="submit" className="searchBtn ripple" onClick={this.handleSubmit}>
            <FontAwesomeIcon icon={faSearch} className="searchIcon" size="lg" />
          </button>
          <Sort sortHandler={this.props.sortHandler} reset={this.resetSort} />
          <AddRating />
        </div>
      );
    }
    return (
      <div className="addRating">
        <h3>Recommended Reviews</h3>
        <input type="text" className="searchBar" placeholder="Search within reviews" value={this.state.value} onChange={this.handleChange} />
        <button type="submit" className="searchBtn" onClick={this.handleSubmit}>
          <FontAwesomeIcon icon={faSearch} className="searchIcon" size="lg" />
        </button>
        <Sort sortHandler={this.props.sortHandler} />
        <div>
          <span className="searchResult">{this.props.totalReviews} reviews mentioning "{this.state.query}"  </span>
          <button className="clearResults">  Clear Results  <button onClick={this.clearSearch} className="closebox"><strong>x</strong></button></button>
        </div>
        <AddRating />
      </div>
    );
  }
}

export default ListHeader;
