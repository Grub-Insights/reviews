import React from 'react';
import '../styles/ReviewList.styles.scss';
import Review from './Review/Review.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'default',
      data: [],
    };
  }

  render() {
    const dataArray = this.props.data;
    const reviewArray = dataArray.map((review, i) => {
      if (i === this.props.data.length - 1) {
        return (
          <div className="reviewItem finalReview">
            <Review hover={this.props.hover} updateVote={this.props.updateVote} review={review} />
          </div>
        );
      }
      return (
        <div className="reviewItem">
          <Review hover={this.props.hover} updateVote={this.props.updateVote} review={review} />
        </div>
      );
    });

    return (
      <div>
        {reviewArray}
      </div>
    );
  }
}
export default ReviewList;
