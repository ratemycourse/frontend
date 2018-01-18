import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';

const applySubmitButton = ({ onSubmit, enableSubmit, userScore}) => {
  render(
    <div>
      <div
        className={ `btn btn-outline-${
          enableSubmit ? ('secondary') : ('grey disabled') } btn-sm`
        } onClick={ () => onSubmit(userScore) }
      >Submit</div>
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
