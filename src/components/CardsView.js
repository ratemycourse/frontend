import React from 'react';
import { compose } from 'recompose';
import xslt from 'xslt';

import InjectStarRating from '../enhancers/InjectStarRating';
import ApplyCourseRoute from '../enhancers/ApplyCourseRoute';

import '../scss/CardsView.scss';

const enhance =
  compose(
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
        <div dangerouslySetInnerHTML={ {__html: transformedXML} } />
    </div>
  );
});

export default CardsView;
