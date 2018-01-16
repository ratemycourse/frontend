import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';

import StarRating from '../components/StarRating';
import colors from '../scss/_palette.scss';

const Injection = ({ score, code, onClick }) => {
  const avgRating = document.getElementsByClassName('avgRating');
  const userRating = document.getElementsByClassName('userRating');
  const sizeList = { s: '1.2em', m: '2em', l: '2.2em'};

  if (avgRating) {
    for (const element of avgRating) {
      const size = sizeList[element.classList[1]];
      const avgScore = parseInt(element.getAttribute('score'), 10);
      render(
        <StarRating
          score={ avgScore }
          code={ code }
          color={ avgScore ? (colors.warning) : (colors.lightGrey) }
          count={ 5 }
          size={ size }
          lock={ true }
        />,
        element
      );
    }
  }
  if (userRating) {
    for (const element of userRating) {
      const size = sizeList[element.classList[1]];
      render(
        <StarRating
          score={ score }
          code={ code }
          color={ score ? (colors.warning) : (colors.lightGrey) }
          count={ 5 }
          onClick={ onClick }
          lock={ false }
          size={ size }
        />,
        element
      );
    }
  }
};

const InjectStarRating = lifecycle({
  componentDidMount() {
    Injection({
      score: this.props.userScore,
      code: this.props.code,
      onClick: this.props.onClick,
    });
  },
  componentDidUpdate(props) {
    console.log(props);
    Injection({
      score: props.userScore,
      code: props.code,
      onClick: props.onClick,
    });
  },
});

export default InjectStarRating;
