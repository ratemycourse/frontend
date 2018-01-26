import React from 'react';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
  withHandlers({
    onClick: (props) => (e) => { props.onClick(e); },
  }),
);

const ControlBar = enhance(({
  onClick,
}) => {
  return (
    <div onClick={ onClick } >
      A component!
    </div>
  );
});

export default ControlBar;
