import React from 'react';
import { compose } from 'recompose';

import CourseComments from './CourseComments';
import InjectStarRating from '../enhancers/InjectStarRating';
import InjectSubmitButton from '../enhancers/InjectSubmitButton';

const enhance = compose(
  InjectStarRating,
  InjectSubmitButton,
);

const CourseView = enhance(({
  coursePage,
}) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={ {__html: coursePage} } />
      <CourseComments />
    </div>
  );
});

export default CourseView;
