import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
  withHandlers({
  }),
);

const CourseComments = enhance(({
  comments,
}) => {
  return (
    <div className="card m-4">
      CourseComments
    </div>
    );
});

/*const mapStateToProps = (state) => {
  return {
    };
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    };
  }
}*/

export default CourseComments;
