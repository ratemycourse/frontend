import React from 'react';
import { render } from 'react-dom';
import { compose, lifecycle } from 'recompose';
import LoadScreenWhileLoading from '../enhancers/LoadScreenWhileLoading';
import ErrorScreenOnError from '../enhancers/ErrorScreenOnError';
import InjectStarRating from '../enhancers/InjectStarRating';
import colors from '../scss/_palette.scss';

const addSubmitButton = ({ onSubmit, enableSubmit, userScore }) => {
  render(
    <div
      className={ `btn btn-secondary float-right m-2 ${
        enableSubmit ? ('') : ('disabled') }`
      } onClick={ () => onSubmit(userScore) }
    >SUBMIT</div>,
    document.getElementsByClassName('submitButton').item(0)
  );
};

const enhance = compose(
  LoadScreenWhileLoading,
  ErrorScreenOnError,
  InjectStarRating,
  /*lifecycle({
    componentDidMount() {
      InjectStarRating({
        rating: this.props.userScore,
        target: 'userRating',
        code: this.props.code,
        count: 5,
        colors: { active: colors.warning, greyed: colors.lightGrey },
        onClick: this.props.onClick,
      });
      addSubmitButton(this.props);
    },
    componentDidUpdate() {
      InjectStarRating({
        rating: this.props.userScore,
        target: 'userRating',
        code: this.props.code,
        count: 5,
        colors: { active: colors.warning, greyed: colors.lightGrey },
        onClick: this.props.onClick,
      });
      addSubmitButton(this.props);
    },
  }),*/
);

const CourseView = enhance(({
  coursePage,
  enableSubmit,
}) => {
  console.log(enableSubmit);
  return (
    <div>
      <div dangerouslySetInnerHTML={ {__html: coursePage} } />
    </div>
  );
});

export default CourseView;
