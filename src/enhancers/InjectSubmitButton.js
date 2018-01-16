import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';

const applySubmitButton = ({ onSubmit, enableSubmit, userScore}) => {
  render(
    <div>
      <div
        className={ `btn btn-secondary p-2 border border-top-0 border-bottom-0 border-right-0 border-white btn-customrounded-left ${
          enableSubmit ? ('') : ('disabled') }`
        } onClick={ () => onSubmit(userScore) }
      >SUBMIT</div>
    </div>,
    document.getElementsByClassName('submitButton').item(0)
  );
};

const InjectSubmitButton = lifecycle({
  componentDidMount() {
    applySubmitButton(this.props);
  },
  componentDidUpdate() {
    applySubmitButton(this.props);
  },
});

export default InjectSubmitButton;
