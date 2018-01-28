
import React from 'react';
import { compose, withHandlers, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import '../scss/ProfileSideBar.scss';
import * as actionCreators from '../store/Actions';

import View from '../components/ProfileView';
import SideBar from '../components/ProfileSideBar';

const redirectIfLoggedIn = lifecycle({
  componentDidUpdate() {
    if (!this.props.loggedIn) {
      this.props.history.goBack();
    }
  },
});

const enhance = compose(
  redirectIfLoggedIn,
  withState('toggleEdit', 'setToggleEdit', false),
  withHandlers({
    onSubmit: (props) => async (e) => {
      await props.alterUser(e);
    },
     onEdit: (props) => (e) => {
      if (!props.errormsg || e) {
        props.toggleEdit ? (props.setToggleEdit(false)) : (props.setToggleEdit(true));
      }
    },
    goToProfile: (props) => () => {
      props.history.push('/profile');
    },
  }),
);

const ProfilePage = enhance(({
  // User props,
  userName,
  userEmail,
  userPass,
  userID,
  errormsg,
  onSubmit,
  goToProfile,
  onEdit,
  toggleEdit,
  resetError,
}) => {
  return (
    <div className="wrapper bg-grey">
      <nav id="sidebar">
        <div className="sidebar p-3 bg-primary text-white">
          <h5 className="d-flex pt-2 pb-2 rounded flex-wrap justify-content-center">Hello&nbsp;<div className="text-secondary">{ userName }</div>!</h5>
          <SideBar 
            goToProfile={ goToProfile }
          />
        </div>
      </nav>
      <div id="content" className="bg-grey text-white">
        <View
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
    errormsg: state.userState.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    alterUser: async (data) => { await dispatch(actionCreators.alterUser(data)) },
    resetError: () => { dispatch({result: null, type: 'RESET_USERDATA_ERROR'})},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
