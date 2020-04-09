/* eslint-disable no-useless-constructor */
import React from 'react';
import $ from 'jquery';
import Pagination from './Pagination.jsx';
import ReviewList from './ReviewList.jsx';
import ListHeader from './ListHeader.jsx';
import '../styles/styles.scss';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
    };
    this.searchReviews = this.searchReviews.bind(this);
    this.sortHandler = this.sortHandler.bind(this);
    this.selectNextPage = this.selectNextPage.bind(this);
    this.selectPreviousPage = this.selectPreviousPage.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.updateVote = this.updateVote.bind(this);
    this.reviewHover = this.reviewHover.bind(this);
  }

  componentDidMount() {
    this.getReviews(() => {
      this.sortHandler('Newest First');
    });
  }

  getReviews(cb) {
    $.get(`http://localhost:5001/restaurants/100/reviews?`, (results) => {
      this.setState({
        data: results,
        totalReviews: results.length,
        initialReviews: results.length,
      }, () => { if (cb) { cb(); } console.log(this.state.data); });
    });
  }

  selectNextPage() {
    let nextPage = this.state.currentPage;
    nextPage += 1;
    this.setState({
      currentPage: nextPage,
    });
    this.scrollToTop();
  }

  selectPreviousPage() {
    let previousPage = this.state.currentPage;
    previousPage -= 1;
    this.setState({
      currentPage: previousPage,
    });
    this.scrollToTop();
  }

  selectPage(value) {
    this.setState({
      currentPage: value,
    });
    this.scrollToTop();
  }

  searchReviews(value) {
    this.getReviews(() => {
      const { data } = this.state
      const searched = [];
      data.forEach((review) => {
        if (review.body.includes(value)) {
          searched.push(review);
        }
      });
      this.setState({
        data: searched,
        totalReviews: searched.length,
        currentPage: 1,
      });
    });
  }


  resetSearch() {
    this.setState({
      currentPage: 1,
      totalReviews: this.state.initialReviews,
    }, this.getReviews);
  }

  sortHandler(value) {
    const { data } = this.state
    if (value === 'Highest Rated') {
      const sorted = [...data].sort((a, b) => b.rating - a.rating);
      this.setState({ data: sorted });
    } else if (value === 'Lowest Rated') {
      const sorted = [...data].sort((a, b) => a.rating - b.rating);
      this.setState({ data: sorted });
    } else if (value === 'Newest First') {
      const sorted = [...data].sort((a, b) => {
        return Number(`${b.date.slice(0, 4)}${b.date.slice(5, 7)}${b.date.slice(8, 10)}`) - Number(`${a.date.slice(0, 4)}${a.date.slice(5, 7)}${a.date.slice(8, 10)}`);
      });
      this.setState({ data: sorted });
    } else if (value === 'Oldest First') {
      const sorted = [...data].sort((a, b) => {
        return Number(`${a.date.slice(0, 4)}${a.date.slice(5, 7)}${a.date.slice(8, 10)}`) - Number(`${b.date.slice(0, 4)}${b.date.slice(5, 7)}${b.date.slice(8, 10)}`);
      });
      this.setState({ data: sorted });
    }
    this.setState({ currentPage: 1 });
  }

  updateVote(vote, reviewInfo) {
    let voteNum;
    if (vote === 'useful') {
      voteNum = reviewInfo.useful_vote
    } else if (vote === 'cool') {
      voteNum = reviewInfo.cool_vote
    } else if (vote === 'funny') {
      voteNum = reviewInfo.funny_vote
    }
    let dataCopy = this.state.data
    let index;
    dataCopy.forEach((obj, i) => {
      if (obj.review_id === reviewInfo.review_id) {
        index = i
      }
    });
    let voteType = `${vote}_vote`;
    let voteCount = `${vote}_count`;
    $.ajax(`http://localhost:5001/reviews/${reviewInfo.review_id}?value=${voteType}&voted=${voteNum}`, {
      type: 'PATCH',
      data: reviewInfo,
      success: (result) => {
        console.log(`http://localhost:5001/reviews/${reviewInfo.review_id}?value=${voteType}&voted=${voteNum}`);
        console.log(result, 'look here');
      },
    });
    let reviewCopy = reviewInfo;
    if (reviewCopy[voteType] === 0) {
      reviewCopy[voteType] += 1;
      reviewCopy[voteCount] += 1;
    } else {
      reviewCopy[voteType] -= 1;
      reviewCopy[voteCount] -= 1;
    }
    dataCopy.splice(index, 1, reviewCopy);
    // console.log(dataCopy)
    this.setState({
      data: dataCopy,
    })
  }

  scrollToTop(){
    window.scrollTo({
      top: 0,
    });
  }

  reviewHover() {
    console.log('HEY FROM APP')
  }
  render() {
    const pageData = this.state.data.slice((this.state.currentPage * 20) - 20,  this.state.currentPage * 20)
    return (
      <div className="application">
        <ListHeader reset={this.resetSearch} sortHandler={this.sortHandler} searchHandle={this.searchReviews} totalReviews={this.state.totalReviews}/>
        <ReviewList hover={this.reviewHover} updateVote={this.updateVote} data={pageData} />
        <Pagination select={this.selectPage} previous={this.selectPreviousPage} totalReviews={this.state.totalReviews} next={this.selectNextPage} info={this.state} />
      </div>
    );
  }
}

// window.Reviews = App;
export default App;
