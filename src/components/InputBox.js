import React from 'react';
import { compose, withHandlers } from 'recompose';
import styles from './InputBox.css';

const enhance = compose(
  withHandlers({
    onEnter: (props) => (e) => {
      if (e.key === 'Enter') {
        const searchString = document.getElementById(props.id).value;
        if (searchString.length > 0) {
          props.handleSubmit(document.getElementById(props.id).value);
        } else {
          props.handleSubmit('empty');
        }
      }
    },
  })
);

const InputBox = enhance(({
  onEnter,
  placeholder,
  type,
  id,
}) => {
  return (
    <input
      className={ styles.inputbox }
      type={ type }
      id={ id }
      placeholder={ placeholder }
      onKeyPress={ onEnter }
    />
  );
});

export default InputBox;
