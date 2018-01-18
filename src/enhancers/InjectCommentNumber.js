import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';
import FaComment from 'react-icons/lib/fa/comment';
import colors from '../scss/_palette.scss';

const applyCommentNumber = () => {
  for (const element of document.getElementsByClassName('commentNumber')) {
    const sum = element.getAttribute('sumComments');
    console.log(element);
    render(
      <div className="d-flex">
        <FaComment width="1.7em" height="1.7em" color={ sum > 0 ? colors.secondaryColor : colors.lightGrey } />
        <h3 className="font-weight-bold ml-2">{ sum }</h3>
      </div>
      , element
      );
  }
};

const InjectCommentNumber = lifecycle({
  componentDidMount() {
    applyCommentNumber();
  },
  componentDidUpdate() {
    applyCommentNumber();
  },
});

export default InjectCommentNumber;
