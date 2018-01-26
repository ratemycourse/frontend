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
  alterUser,
}) => {
  return (
    <div>
      <Info
        userID={ userID }
        userName={ userName }
        userEmail={ userEmail }
        userPass={ userPass }
        alterUser={ alterUser }
      />
    </div>
  );
});


export default(View);
