import React from 'react';
import { render } from 'react-dom';
import StarRating from '../components/StarRating';

const InjectStarRating = ({ rating, code, onClick, lock = false, count, colors, target }) => {
  for (const element of document.getElementsByClassName(target)) {
    console.log(rating);
    render(
      <StarRating
        userScore={ rating }
        code={ code }
        color={ rating ? (colors.active) : (colors.greyed) }
        count={ count }
        onClick={ onClick }
        lock={ lock }
      />,
      element
    );
  }
};

export default InjectStarRating;
