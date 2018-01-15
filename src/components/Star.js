import React from 'react';
import { compose, withHandlers } from 'recompose';
import MdStarOutline from 'react-icons/lib/md/star-outline';
import MdStar from 'react-icons/lib/md/star';

const enhance = compose(
  withHandlers({
    setFill: (props) => () => { props.setFill(props.id); },
    setEmpty: (props) => () => { props.setEmpty(props.id) },
    onClick: (props) => () => { props.onClick(props.id) },
  }),
);

const Star = enhance(({
  id,
  size,
  fill,
  color,
  setFill,
  setEmpty,
  onClick,
}) => {
  return (
    <div
      id={ id }
      onClick={ onClick }
      onMouseEnter={ setFill }
      onMouseLeave={ setEmpty }
    >
      { 
        fill
          ? <MdStar
            fill={ color }
            height={ size }
            width={ size }
            />
          : <MdStarOutline
            fill={ color }
            height={ size }
            width={ size }
            />
      }
    </div>
  );
});

export default Star;
