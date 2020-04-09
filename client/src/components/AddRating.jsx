import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faUserFriends, faStar } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating.jsx';
import '../styles/AddRating.styles.scss';

class AddRating extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="reviewLink">
        <span className="iconContainer">
          <FontAwesomeIcon className="astroIcon" icon={faUserAstronaut} size="3x" />
        </span>
        <div className="bar" />
        <div className="bartwo" />
        <div >
          <FontAwesomeIcon className="newIcon" icon={faUserFriends} size="xs" />
        </div>
        <div className="barThree"/>
        <div className="newStarContainer">
          <FontAwesomeIcon  icon={faStar} size="xs" />
        </div>
        <div className="barFour"/>
        <div className="reviewContainer">
          <Rating />
          <hr />
          <div className="addReviewLink">
            Start your review of
            <strong> this restaurant</strong>
            .
          </div>
        </div>
      </div>
    );
  }
}

export default AddRating;
