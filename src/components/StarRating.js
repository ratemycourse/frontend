import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import GenerateStars from './GenerateStars';
import '../scss/StarRating.scss';

const enhance = compose(
  withState('fill', 'setFill', ({ userScore, count }) => {
    return userScore
      ? ([...Array(userScore).fill(true), ...Array(count - userScore).fill(false)])
      : ([...Array(count).fill(false)]);
  }),
  withState('frozen', 'setFrozen', ({ userScore }) => {
    if (userScore) {
      return true;
    } else if (userScore < 1) {
      return true;
    }
    return false;
  }),
  withHandlers({
    onClick: (props) => (e) => {
      if (!props.lock) {
        props.setFrozen(true);
        props.onClick({ code: props.code, score: e + 1 });
        props.setFill([...Array(e + 1).fill(true), ...Array(props.count - e).fill(false)]);
      }
    },
    setFill: ({ setFill, count, frozen }) => (e) => {
      return frozen
        ? (false)
        : (setFill([...Array(e + 1).fill(true), ...Array(count - e).fill(false)]));
    },
    setEmpty: ({ setFill, count, frozen }) => () => {
      return frozen
        ? (false)
        : (setFill([...Array(count).fill(false)]));
    },
  }),
);

const StarRating = enhance(({
  count,
  fill,
  userScore,
  color,
  onClick,
  setFill,
  setEmpty,
}) => {
  return (
    <div className="wrapper d-flex m-0 p-1">
      <GenerateStars
        count={ count }
        size="2.7em"
        fill={ fill }
        color={ color }
        onClick={ onClick }
        setFill={ setFill }
        setEmpty={ setEmpty }
        userScore={ userScore }
      />
    </div>
  );
});

export default StarRating;
