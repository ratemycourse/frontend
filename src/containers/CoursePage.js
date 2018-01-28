import React from 'react';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import CourseView from '../components/CourseView';
import * as actionCreators from '../store/Actions';
import applyEditCommentComponent from '../enhancers/applyEditCommentComponent';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      this.props.getCourse(this.props.match.params.courseCode);
    },
  }),
  withState('expand', 'setExpand', false),
  withHandlers({
    onClickStar: (props) => (e) => {
      if (props.loggedIn) {
        props.setUserScore(e.score);
        props.setEnableSubmitScore(true);
      } else { props.setAlert('Please log in before scoring course') }
    },
    onSubmitComment: (props) => (commentText) => {
      if (commentText && props.loggedIn) {
        props.submitUserComment(props.userID, props.courseCode, commentText)
          .then(() => { props.getCourse(props.courseCode) });
        props.setExpand(false);
      } else if (props.loggedIn) {
        props.setAlert('Enter some text before submitting the comment.');
      } else {
        props.setAlert('Please log in to submit a comment.');
      }
    },
    onAddComment: ({ expand, setExpand }) => () => {
        expand ? setExpand(false) : setExpand(true);
    },
    onEditComment: (props) => (e) => { 
      props.editComment(e.commentId, e.commentText); 
      applyEditCommentComponent(e.commentId, e.commentText, props.submitCommentEdit, props.getCourse, props.courseCode); 
    },
    onDeleteComment: ({ deleteComment, getCourse, courseCode }) => (e) => {
      deleteComment(e)
      .then(() => { getCourse(courseCode); }); 
    },
    onSubmitScore: (props) => (userScore) => {
      if (props.loggedIn) {
        props.submitUserScore(props.userID, props.courseCode, userScore)
         .then(() => { props.getCourse(props.courseCode) });
      }
    },
  })
);

const Course = enhance(({
  loading,
  coursePage,
  enableSubmitScore,
  userScore,
  courseCode,
  expand,
  alert,
  userComments,
  commentEdit,
  onClickStar,
  onSubmitScore,
  onAddComment,
  onSubmitComment,
  onEditComment,
  onDeleteComment,
  clearAlert,
}) => {
  return (
    <div>
      <CourseView
        loading={ loading }
        coursePage={ coursePage }
        enableSubmitScore={ enableSubmitScore }
        alert={ alert }
        userScore={ userScore }
        userComments={ userComments }
        commentEdit={ commentEdit }
        expand={ expand }
        code={ courseCode }
        onClickStar={ onClickStar }
        onSubmitScore={ onSubmitScore }
        onAddComment={ onAddComment }
        onSubmitComment={ onSubmitComment }
        onEditComment={ onEditComment }
        onDeleteComment={ onDeleteComment }
        clearAlert={ clearAlert }
      />
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loading: state.coursePageState.loadingGroup.isLoading,
    coursePage: state.coursePageState.coursePage,
    courseCode: state.coursePageState.courseCode,
    commentEdit: state.coursePageState.commentEdit,
    enableSubmitScore: state.coursePageState.enableSubmitScore,
    userScore: state.coursePageState.userScore,
    alert: state.coursePageState.alert,
    userScoresGiven: state.userState.currentUserData.userScoresGiven,
    userID: state.userState.currentUserData.userId,
    userComments: state.userState.currentUserData.userComments,
    loggedIn: state.userState.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: async (courseCode) => { await dispatch(actionCreators.getCourse(courseCode)) },
    submitUserScore: async (userID, course, score) => { await dispatch(actionCreators.submitUserScore(userID, course, score)); },
    submitUserComment: async (userID, courseCode, commentText) => { await dispatch(actionCreators.submitUserComment(userID, courseCode, commentText)) },
    submitCommentEdit: async (commentId, commentText) => { await dispatch(actionCreators.submitCommentEdit(commentId, commentText)); },
    editComment: (commentId, commentText) => { dispatch({ result: { commentId: commentId, commentText: commentText }, type: 'SET_COMMENT_EDIT' }) },
    deleteComment: async (bool, commentId) => { await dispatch(actionCreators.deleteComment(bool, commentId)); },
    setEnableSubmitScore: (bool) => { dispatch({ result: bool, type: 'SET_ENABLE_SUBMIT'}) },
    setAlert: (text) => { dispatch({ result: text, type: 'SET_ALERT' }) },
    clearAlert: () => { dispatch({ type: 'CLEAR_ALERT' }) },
    setUserScore: (score) => { dispatch({result: score, type: 'SET_USER_SCORE' }) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
