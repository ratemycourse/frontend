import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
  withHandlers({
  }),
);

const Ratings = enhance(({
  userName,
}) => {
  return (
    <div>
      HERE ARE YOUR RATINGS, { userName }:
    </div>
  );
});

export default connect()(Ratings);
