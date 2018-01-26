import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Info from '../components/ProfileInfo';
import Ratings from '../components/ProfileRatings';

const enhance = compose(
  withHandlers({
  }),
);

const View = enhance(({
  // User props,
  userName,
  userID,
  userEmail,
  userPass,
  onSubmit,
}) => {
  return (
    <div>
      <Info
        userID={ userID }
        userName={ userName }
        userEmail={ userEmail }
        userPass={ userPass }
        onSubmit={ onSubmit }
      />
    </div>
  );
});


export default(View);
