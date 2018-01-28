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
  alert,
  clearAlert,
}) => {
  return (
    <div>
      <div className={ `d-${ alert ? 'block' : 'none' } position-absolute` } style={ {top: '50%', left: '50%', zIndex: '9999' } }>
        <div className="position-relative bg-white border border-danger text-danger p-5 rounded" style={ {left: '-50%'} }>
          <div 
            className="btn btn-outline-danger btn-sm position-absolute m-2 pt-1 pb-1 pl-2 pr-2" 
            style={ {right: '0px', top: '0px'} }
            onClick={ clearAlert }
          >&#x2715;</div>
          <div>{ alert }</div>
        </div>
      </div>
      <div className="pl-5 pr-5">
        <div dangerouslySetInnerHTML={ {__html: coursePage} } />
      </div>
    </div>
  );
});

export default CourseView;
