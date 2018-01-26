import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';
import MdEdit from 'react-icons/lib/md/edit';
import TiTimes from 'react-icons/lib/ti/times';
import colors from '../scss/_palette.scss';

const applyAddCommentsComponent = ({ expand, onSubmitComment }) => {
  render(
    <div className={ `bg-white rounded p-1 collapse ${ expand ? 'show' : false }` }>
      <div className="bg-white rounded">
        <textarea
          className="form-control"
          id="commentField"
          placeholder="Type your comment here..."
          type="text"
        />
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
