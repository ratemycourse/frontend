import React from 'react';
import { render } from 'react-dom';
import { compose, lifecycle } from 'recompose';
import xslt from 'xslt';
import LoadScreenWhileLoading from '../enhancers/LoadScreenWhileLoading';
import ErrorScreenOnError from '../enhancers/ErrorScreenOnError';
import StarRating from './StarRating';
import '../scss/CardsView.scss';
import colors from '../scss/_palette.scss';

const findParentByClassName = (element, className) => {
  if (element && element.className.match(className)) {
    return element;
  }
  return findParentByClassName(element.parentElement, className);
};

const applyStarRating = () => {
  for (const element of document.getElementsByClassName('rating')) {
    const code = findParentByClassName(element, 'card ').getAttribute('code');
    let [avgRating] = element.nextSibling.children;
    let color = colors.tetriaryColor;
    if (avgRating.textContent === 'No rating') {
      color = colors.lightGrey;
      avgRating = 0;
    } else {
      avgRating = parseInt(avgRating.textContent, 10);
    }
    render(
      <StarRating
        userScore={ avgRating }
        code={ code }
        color={ color }
        count={ 5 }
        lock={ true }
      />,
      element
    );
  }
};

const applyCourseRoute = (goToCoursePageHandler) => {
  for (const element of document.getElementsByClassName('courseCard')) {
    element.addEventListener('click', () => goToCoursePageHandler(element.getAttribute('code')));
  }
};

const enhance =
  compose(
    LoadScreenWhileLoading,
    ErrorScreenOnError,
    lifecycle({
      componentDidMount() {
        applyStarRating(this.props.userCourseScores);
        applyCourseRoute(this.props.goToCoursePageHandler);
      },
      componentDidUpdate() {
        applyStarRating(this.props.userCourseScores);
        applyCourseRoute(this.props.goToCoursePageHandler);
      },
    }),
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
