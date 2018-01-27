import React from 'react';
import { render } from 'react-dom';
import { lifecycle } from 'recompose';

const applySubmitButton = ({ onSubmitScore, enableSubmitScore, userScore}) => {
  render(
    <div>
      <div
        className={ `btn btn-outline-${
          enableSubmitScore ? ('secondary') : ('grey disabled') } btn-sm`
        } onClick={ () => onSubmitScore(userScore) }
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
