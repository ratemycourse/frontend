import React from 'react';
import { render } from 'react-dom';
import { compose, lifecycle } from 'recompose';
import xslt from 'xslt';
import LoadScreenWhileLoading from './LoadScreenWhileLoading';
import StarRating from './StarRating';
import '../scss/CardsView.scss';

const findParentByClassName = (element, className) => {
  if (element && element.className.match(className)) {
    return element;
  }
  return findParentByClassName(element.parentElement, className);
};

const applyStarRating = (onClick) => {
  for (const element of document.getElementsByClassName('rating')) {
    const code = findParentByClassName(element, 'card ').getAttribute('code');
    let [avgRating] = element.nextSibling.children;
    let color = '#4a5fda';
    if (avgRating.textContent === 'No rating') {
      color = '#cacaca';
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
        onClick={ onClick }
        lock={ true }
      />,
      element
    );
  }
};

const enhance =
  compose(
    LoadScreenWhileLoading,
    lifecycle({
      componentDidMount() {
        applyStarRating(this.props.onClick, this.props.userCourseScores);
      },
      componentDidUpdate() {
        applyStarRating(this.props.onClick, this.props.userCourseScores);
      },
    }),
  );

const CardsView = enhance(({
  courses,
  coursesXSLT,
}) => {
  const transformedXML = xslt(courses, coursesXSLT);
  return (
    <div className="container-fluid p-2 m-0">
      <div className="row p-0 m-0">
        <div dangerouslySetInnerHTML={ {__html: transformedXML} } />
      </div>
    </div>
  );
});

export default CardsView;
