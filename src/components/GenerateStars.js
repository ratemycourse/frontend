import React from 'react';
import Star from './Star';

const GenerateStars = ({
  count,
  size,
  fill,
  color,
  onClick,
  setFill,
  setEmpty,
}) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(
      <Star
        id={ i }
        size={ size }
        fill={ fill[i] }
        color={ color }
        onClick={ onClick }
        setFill={ setFill }
        setEmpty={ setEmpty }
      />
    );
  }
  return stars;
};

export default GenerateStars;
