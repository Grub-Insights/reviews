import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faCamera, faStar } from '@fortawesome/free-solid-svg-icons';
import HoverLinks from '../HoverLinks.jsx'
import './User.scss';
const divStyle = {
    display: 'flex',
    alignItems: 'center',
  };
// const divStyle = {};

const User = ({ isHovered, user }) => {
  return (
    <div>
      <span style={divStyle}>
        <span className="profilePicContainer">
          <img width="120px" height="120px" className="profilePic" src={user.profile_pic} alt="nothing" />
        </span>
        <span className="userInfo">
          <div className="userName" id="userName">
            <strong className="userInfo">{user.name}</strong>
          </div>
          <strong className="userInfoText">{user.location}</strong>
          <div className="userInfoText">
            <FontAwesomeIcon className="userIcon" icon={faUserFriends} />
            <strong>{`${user.friends} `}</strong>
            friends
          </div>
          <div className="userInfoText">
            <span className="userIcon">
              <FontAwesomeIcon className="starIcon" icon={faStar} size="xs" />
            </span>
            <strong>{`${user.reviews} `}</strong>
            reviews
          </div>
          <div className="userInfoText">
            <FontAwesomeIcon className="userIcon" icon={faCamera} />
            <strong>{`${user.photos} `}</strong>
            photos
          </div>
          <HoverLinks isHovered={isHovered} />
          {/* <HoverLinks /> */}
        </span>
      </span>
    </div>

  );
};

export default User;
