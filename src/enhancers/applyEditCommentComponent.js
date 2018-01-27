import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';

const applyEditCommentComponent = (commentId, text, onSubmit, reload, courseCode) => {
  const element = document.getElementById(commentId.toString());
  render(
    <div>
      <div className="text-secondary font-weight-bold">Editing comment: </div>
      <textarea
        className="form-control"
        id="editCommentField"
        defaultValue={ text }
      />
      <div className="float-right">
        <div 
          className="btn btn-secondary ml-auto m-1"
          onClick={ () => onSubmit(commentId, document.getElementById('editCommentField').value).then(reload(courseCode)) }
        >Submit</div>
        <div 
          className="btn btn-danger"
          onClick={ () => reload(courseCode) }
        >Cancel</div>
      </div>
    </div>
    ,
    element
    );
};

export default applyEditCommentComponent;
