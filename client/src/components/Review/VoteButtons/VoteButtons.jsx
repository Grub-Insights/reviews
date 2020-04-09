import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinBeam, faGrin, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './VoteButtons.scss';

const VoteButtons = ( {status, updateVote, review} ) => {
  let funnyCount;
  let coolCount;
  let usefulCount;
  if (review.funny_count === 0) { funnyCount = ''; }
  else { funnyCount = review.funny_count; }
  if (review.cool_count === 0) { coolCount = ''; }
  else { coolCount = review.cool_count; }
  if (review.useful_count === 0) { usefulCount = ''; }
  else { usefulCount = review.useful_count; }
  let buttonArray = [];
  if (review.useful_vote === 0) {
    buttonArray.push(<button type="submit" className="voteBtn clickFX" onClick={() => updateVote('useful')}>
    <FontAwesomeIcon icon={faLightbulb} size="lg" useful-test="useful" />
    <span btn-test="useful" id="us" className="btnText">{`Useful ${usefulCount}`}</span>
  </button>)
  } else {
    buttonArray.push(<button type="submit" className="voteBtn clickFX pushed" onClick={() => updateVote('useful')}>
    <FontAwesomeIcon icon={faLightbulb} size="lg" useful-test="useful" />
    <span btn-test="useful" id="us" className="btnText">{`Useful ${usefulCount}`}</span>
  </button>)
  }
  if (review.funny_vote === 0) {
    buttonArray.push(<button type="submit" className="voteBtn clickFX" onClick={() => updateVote('funny')}>
    <FontAwesomeIcon icon={faGrin} size="lg" funny-test="funny" />
    <span btn-test="funny" className="btnText clickFX">{`Funny ${funnyCount}`}</span>
  </button>)    
  } else {
    buttonArray.push(<button type="submit" className="voteBtn clickFX pushed" onClick={() => updateVote('funny')}>
    <FontAwesomeIcon icon={faGrin} size="lg" funny-test="funny" />
    <span btn-test="funny" className="btnText clickFX">{`Funny ${funnyCount}`}</span>
  </button>)
  }
  if (review.cool_vote === 0) {
    buttonArray.push(<button type="submit" className="voteBtn clickFX" onClick={() => updateVote('cool')}>
    <FontAwesomeIcon icon={faGrinBeam} size="lg" cool-test="cool" />
    <span btn-test="cool" className="btnText">{`Cool ${coolCount}`}</span>
  </button>)   
  } else {
    buttonArray.push(<button type="submit" className="voteBtn pushed clickFX" onClick={() => updateVote('cool')}>
    <FontAwesomeIcon icon={faGrinBeam} size="lg" cool-test="cool" />
    <span btn-test="cool" className="btnText clickFX">{`Cool ${coolCount}`}</span>
  </button>)
  }

  return (
    <span className="btnContainer">{buttonArray}</span>
  );
}

export default VoteButtons;
