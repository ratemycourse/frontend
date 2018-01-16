import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import GenerateStars from './GenerateStars';

const enhance = compose(
  withState('fill', 'setFill', ({ score, count }) => {
    return score
      ? ([...Array(score).fill(true), ...Array(count - score).fill(false)])
      : ([...Array(count).fill(false)]);
  }),
  withState('frozen', 'setFrozen', ({ lock }) => lock),
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
    setEmpty: ({ setFill, count, frozen, score }) => () => {
    if (frozen) {
        return false;
      } else if (score) {
        setFill([...Array(score).fill(true)]);
      } else {
        setFill([...Array(count).fill(false)]);
      }
    },
  }),
);

const StarRating = enhance(({
  count,
  fill,
  score,
  size,
  color,
  onClick,
  setFill,
  setEmpty,
}) => {
  return (
    <div className="d-flex align-items-center">
      <GenerateStars
        count={ count }
        size={ size }
        fill={ fill }
        color={ color }
        onClick={ onClick }
        setFill={ setFill }
        setEmpty={ setEmpty }
        score={ score }
      />
    </div>
  );
});

export default StarRating;
