import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';

const applyAddCommentsComponent = ({ expand, onSubmitComment }) => {
  render(
    <div className={ `collapse ${ expand ? 'show' : false }` }>
      <div className="bg-white rounded">
        <textarea className="form-control" id="commentField" placeholder="Type your comment here..." type="text" />
      </div>
    </div>,
    document.getElementsByClassName('commentsComponent').item(0)
  );
};

const InjectAddCommentsComponent = lifecycle({
  componentDidMount() {
    applyAddCommentsComponent(this.props);
  },
  componentDidUpdate() {
    applyAddCommentsComponent(this.props);
  },
});

export default InjectAddCommentsComponent;
