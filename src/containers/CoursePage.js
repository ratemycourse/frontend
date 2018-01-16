import React from 'react';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import CourseView from '../components/CourseView';
import * as actionCreators from '../store/Actions';

const enhance = compose(
  lifecycle({
    componentWillMount() {
      this.props.getCourse(this.props.match.params.courseCode);
    },
  }),
  withState('enableSubmit', 'setEnableSubmit', false),
  withState('alertLogin', 'setAlertLogin', false),
  withState('userScore', 'setUserScore', ({ userScoresGiven, match }) => {
    return Object.keys(userScoresGiven).includes(match.params.courseCode)
      ? (userScoresGiven[match.params.courseCode])
      : (null);
  }),
  withHandlers({
    onClick: (props) => (e) => {
      if (props.loggedIn) {
        props.setUserScore(e.score);
        props.setEnableSubmit(true);
      } else { props.setAlertLogin(true) }
    },
    onSubmit: (props) => (userScore) => {
      if (props.loggedIn) {
        props.submitUserScore(props.userID, props.match.params.courseCode, userScore);
      }
    },
  })
);

const Course = enhance(({
  loading,
  coursePage,
  enableSubmit,
  alertLogin,
  userScore,
  match,
  onClick,
  onSubmit,
}) => {
  return (
    <div>
      <CourseView
        loading={ loading }
        coursePage={ coursePage }
        enableSubmit={ enableSubmit }
        alertLogin={ alertLogin }
        userScore={ userScore }
        code={ match.params.courseCode }
        onClick={ onClick }
        onSubmit={ onSubmit }
      />
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loading: state.coursePageState.loadingGroup.isLoading,
    coursePage: state.coursePageState.coursePage,
    courseXML: state.coursePageState.coursePageXML,
    courseXSL: state.coursePageState.coursePageXSL,
    userScoresGiven: state.userState.currentUserData.userScoresGiven,
    userID: state.userState.currentUserData.userId,
    loggedIn: state.userState.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: async (courseCode) => { await dispatch(actionCreators.getCourse(courseCode)) },
    submitUserScore: (userID, course, score) => { dispatch(actionCreators.submitUserScore(userID, course, score)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
