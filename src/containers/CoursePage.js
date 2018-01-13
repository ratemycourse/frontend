import React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import CourseView from '../components/CourseView';
import * as actionCreators from '../store/Actions';

const enhance = compose(
  lifecycle({
    componentWillMount() {
      this.props.getCourse(this.props.match.params.courseCode);
    },
  }),
  withHandlers({
    onClick: (props) => (e) => { if (props.loggedIn) { props.addUserCourseScore(e) } },
    onSubmit: (props) => (e) => { props.submitUserScore(props.userID, e.course, e.score); },
  })
);

const Course = enhance(({
  coursePage,
  loading,
  match,
  userCourseScores,
  onClick,
  onSubmit,
}) => {
  return (
    <div>
      <CourseView
        loading={ loading }
        coursePage={ coursePage }
        onClick={ onClick }
        onSubmit={ onSubmit }
        code={ match.params.courseCode }
        userScore={ userCourseScores ? (userCourseScores[match.params.courseCode]) : (false) }
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
    userCourseScores: state.userState.currentUserData.courseScores,
    loggedIn: state.userState.loggedIn,
    userID: state.userState.currentUserData.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: async (courseCode) => { await dispatch(actionCreators.getCourse(courseCode)) },
    submitUserScore: (userID, course, score) => { dispatch(actionCreators.submitUserScore(userID, course, score)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
