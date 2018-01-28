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
  errormsg,
  onSubmit,
  onEdit,
  toggleEdit,
  resetError,
}) => {
  return (
    <div>
      <Info
        userID={ userID }
        userName={ userName }
        userEmail={ userEmail }
        userPass={ userPass }
        toggleEdit={ toggleEdit }
        errormsg={ errormsg }
        onSubmit={ onSubmit }
        onEdit={ onEdit }
        resetError={ resetError }
      />
    </div>
  );
});


export default(View);
