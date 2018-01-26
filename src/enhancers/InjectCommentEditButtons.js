import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';
import MdEdit from 'react-icons/lib/md/edit';
import TiTimes from 'react-icons/lib/ti/times';
import colors from '../scss/_palette.scss';

const applyCommentEditButtons = ({ onDeleteComment, onEditComment, userComments }) => {
  for (const element of document.getElementsByClassName('editButtons')) {
    const commentId = parseInt(element.parentNode.getAttribute('commentId'), 10);
    const ifUserComment = userComments.includes(commentId);
    render(
      <div className="d-flex justify-content-end">
        <div
          className="btn btn-danger btn-sm m-1"
          onClick={ () => onDeleteComment({ bool: true, commentId: commentId }) }
          style={ { display: ifUserComment ? 'initial' : 'none' } }
        >
          <TiTimes
            width="1.4em"
            height="1.4em"
            color={ colors.white }
          />
        </div>
        <div
          className="btn btn-secondary btn-sm m-1"
          onClick={ onEditComment }
          style={ { display: ifUserComment ? 'initial' : 'none' } }
        >
          <MdEdit
            width="1.4em"
            height="1.4em"
            color={ colors.white }
          />
        </div>
      </div>,
      element
    );
  }
};

const InjectCommentEditButtons = lifecycle({
  componentDidMount() {
    applyCommentEditButtons(this.props);
  },
  componentDidUpdate() {
    applyCommentEditButtons(this.props);
  },
});

export default InjectCommentEditButtons;
