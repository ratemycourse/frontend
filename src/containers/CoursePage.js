import React from 'react';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import CourseView from '../components/CourseView';
import * as actionCreators from '../store/Actions';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      this.props.getCourse(this.props.match.params.courseCode);
    },
  }),
  withState('enableSubmit', 'setEnableSubmit', false),
  withState('expand', 'setExpand', false),
  withState('alert', 'setAlert', false),
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
    onSubmitComment: (props) => (commentText) => {
      console.log(commentText);
      if (commentText && props.loggedIn) {
        props.submitUserComment(props.userID, props.match.params.courseCode, commentText)
          .then(() => { props.getCourse(props.match.params.courseCode) });
        props.setExpand(false);
      } else if (props.loggedIn) {
        props.showAlert('Enter some text before submitting the comment.');
      } else {
        props.showAlert('Please log in to submit a comment.');
      }
    },
    showAlert: ({ setAlert }) => (alertMsg) => {
      if (alertMsg) {
        setAlert(alertMsg);
      }
    },
    onAddComment: ({ expand, setExpand }) => () => {
        expand ? setExpand(false) : setExpand(true);
    },
    onSubmit: (props) => (userScore) => {
      if (props.loggedIn) {
        props.submitUserScore(props.userID, props.match.params.courseCode, userScore)
         .then(() => { props.getCourse(props.match.params.courseCode) });
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
  expand,
  alertMsg,
  onClick,
  onSubmit,
  onAddComment,
  onSubmitComment,
}) => {
  return (
    <div>
      <CourseView
        loading={ loading }
        coursePage={ coursePage }
        enableSubmit={ enableSubmit }
        alertLogin={ alertLogin }
        userScore={ userScore }
        expand={ expand }
        code={ match.params.courseCode }
        onClick={ onClick }
        onSubmit={ onSubmit }
        onAddComment={ onAddComment }
        onSubmitComment={ onSubmitComment }
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
    submitUserScore: async (userID, course, score) => { await dispatch(actionCreators.submitUserScore(userID, course, score)); },
    submitUserComment: async (userID, courseCode, commentText) => { await dispatch(actionCreators.submitUserComment(userID, courseCode, commentText)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
