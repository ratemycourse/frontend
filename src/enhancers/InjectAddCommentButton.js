import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';

const applyAddCommentButton = ({ onAddComment, onSubmitComment, expand }) => {
  render(
    <div>
      <div 
        className="btn btn-inline btn-outline-secondary mr-2 ml-auto"
        style={ {display: expand ? 'inline' : 'none'} }
        onClick={ () => onSubmitComment(document.getElementById('commentField').value) }
      >
          Submit
      </div>
      <div
        className="btn btn-inline btn-outline-danger" onClick={ onAddComment }
        style={ {display: 'inline'} }
      >{ expand ? ('-') : ('+') } Comment</div>
    </div>,
    document.getElementsByClassName('addCommentButton').item(0)
  );
};

const InjectAddCommentButton = lifecycle({
  componentDidMount() {
    applyAddCommentButton(this.props);
  },
  componentDidUpdate() {
    applyAddCommentButton(this.props);
  },
});

export default InjectAddCommentButton;
