import React from 'react';
import { compose } from 'recompose';
import xslt from 'xslt';

import InjectStarRating from '../enhancers/InjectStarRating';
import InjectCommentNumber from '../enhancers/InjectCommentNumber';
import ApplyCourseRoute from '../enhancers/ApplyCourseRoute';
import LoadScreenWhileLoading from '../enhancers/LoadScreenWhileLoading';

import '../scss/CardsView.scss';

const enhance =
  compose(
    LoadScreenWhileLoading,
    InjectCommentNumber,
    InjectStarRating,
    ApplyCourseRoute,
  );

const CardsView = enhance(({
  courseList,
  courseListXSL,
}) => {
  const transformedXML = xslt(courseList, courseListXSL);
  return (
    <div className="wrapper">
        <div className="w-100" dangerouslySetInnerHTML={ {__html: transformedXML} } />
    </div>
  );
});

export default CardsView;
