
import React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import '../scss/ProfileSideBar.scss';
import * as actionCreators from '../store/Actions';

import View from '../components/ProfileView';
import SideBar from '../components/ProfileSideBar';

const enhance = compose(
  withHandlers({
    onSubmit: (props) => (e) => {
      props.dispatch(actionCreators.alterUser(formData));
    },
  }),
);

const ProfilePage = enhance(({
  // User props,
  userName,
  userEmail,
  userPass,
  userID,
  onSubmit,
  alterUser,
}) => {
  return (
    <div className="wrapper bg-grey" >
      <nav id="sidebar">
        <div className="sidebar bg-primary text-white">
          <h3>Hello { userName } !</h3>
          <SideBar />
        </div>
      </nav>
      <div id="content" className="bg-grey text-white">
        <View
          userID={ userID }
          userName={ userName }
          userEmail={ userEmail }
          userPass={ userPass }
          alterUser={ alterUser }
        />
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    // User props.
    userCourseScores: state.userState.currentUserData.courseScores,
    loggedIn: state.userState.loggedIn,
    userName: state.userState.currentUserData.userName,
    userEmail: state.userState.currentUserData.userEmail,
    userPass: state.userState.currentUserData.password,
    userID: state.userState.currentUserData.userId,
    userStateError: state.userState.Error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alterUser: (data) => { dispatch(actionCreators.alterUser(data)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
