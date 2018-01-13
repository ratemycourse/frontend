import React from 'react';
import { render } from 'react-dom';
import { compose, lifecycle } from 'recompose';
import StarRating from './StarRating';
import LoadScreenWhileLoading from '../enhancers/LoadScreenWhileLoading';
import ErrorScreenOnError from '../enhancers/ErrorScreenOnError';
import colors from '../scss/_palette.scss';

const applyStarRating = ({ onClick, userScore, code }) => {
  for (const element of document.getElementsByClassName('userRating')) {
    let color = colors.warning;
    if (!userScore) {
      color = colors.lightGrey;
    }

    render(
      <div className="p-2">
        <StarRating
          userScore={ userScore }
          code={ code }
          color={ color }
          count={ 5 }
          onClick={ onClick }
          lock={ false }
        />
      </div>,
      element
    );
  }
};

const addSubmitButton = ({ onSubmit }) => {
  render(
    <div
      className="btn btn-secondary float-right m-2" onClick={ onSubmit }
    >SUBMIT</div>,
    document.getElementsByClassName('submitButton').item(0)
  );
};

const enhance = compose(
  LoadScreenWhileLoading,
  ErrorScreenOnError,
  lifecycle({
    componentDidMount() {
      applyStarRating(this.props);
      addSubmitButton(this.props);
    },
  }),
);

const CourseView = enhance(({
  coursePage,
}) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={ {__html: coursePage} } />
    </div>
  );
});

export default CourseView;
