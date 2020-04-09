import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './RatingBar.scss';

const RatingBar = (props) => {
  const rating = props.rating;
  let ratingColor;
  if (rating === 1) {
    ratingColor = 'oneStar';
  } else if (rating === 2) {
    ratingColor = 'twoStars';
  } else if (rating === 3) {
    ratingColor = 'threeStars';
  } else if (rating === 4) {
    ratingColor = 'fourStars';
  } else if (rating === 5) {
    ratingColor = 'fiveStars';
  }
  const starsArray = [];
  let className;
  let i;
  for (i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      className = ['starBox', ratingColor].join(' ');
      starsArray.push(
        <span className={className} key={i}>
          <FontAwesomeIcon className="star" icon={faStar} data-test="full" />
        </span>,
      );
    } else {
      className = 'emptyStarBox';
      starsArray.push(
        <span className={className} key={i}>
          <FontAwesomeIcon className="star" icon={faStar} data-test="empty" />
        </span>,
      );
    }
  }
  return (
    <span className="ratingBar">
      {starsArray}
    </span>
  );
};

export default RatingBar;
