
import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import '../scss/ProfileSideBar.scss';

import View from '../components/ProfileView';
import SideBar from '../components/ProfileSideBar';

const enhance = compose(
  withHandlers({
  }),
);


const ProfilePage = enhance(({
  // User props,
  userName,
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
        <View />
      </div>
    </div>
  );
});


const mapStateToProps = (state) => {
  return {
    // User props.
    userCourseScores: state.userState.currentUserData.courseScores,
    loggedIn: state.userState.loggedIn,
    userName: state.userState.currentUserData.name,
    userEmail: state.userState.currentUserData.email,
    userPass: state.userState.currentUserData.password,
    userStateError: state.userState.Error,
  };
};


export default connect(mapStateToProps)(ProfilePage);
