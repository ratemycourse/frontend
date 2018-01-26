import React from 'react';
import { compose } from 'recompose';

import InjectStarRating from '../enhancers/InjectStarRating';
import InjectSubmitButton from '../enhancers/InjectSubmitButton';
import InjectAddCommentButton from '../enhancers/InjectAddCommentButton';
import InjectAddCommentsComponent from '../enhancers/InjectAddCommentsComponent';
import InjectCommentEditButtons from '../enhancers/InjectCommentEditButtons';
import LoadScreenWhileLoading from '../enhancers/LoadScreenWhileLoading';

const enhance = compose(
  LoadScreenWhileLoading,
  InjectStarRating,
  InjectSubmitButton,
  InjectAddCommentButton,
  InjectAddCommentsComponent,
  InjectCommentEditButtons,
);

const CourseView = enhance(({
  coursePage,
}) => {
  return (
    <div className="pl-5 pr-5">
      <div dangerouslySetInnerHTML={ {__html: coursePage} } />
    </div>
  );
});

export default CourseView;
