import React from 'react';
import { compose, withHandlers } from 'recompose';
import styles from './SearchBar.css';

const enhance = compose(
  withHandlers({
    onEnter: (props) => (e) => {
      if (e.key === 'Enter') {
        const searchString = document.getElementById('textbar').value;
        if (searchString.length > 0) {
          props.handleSubmit(document.getElementById('textbar').value);
        } else {
          props.handleSubmit('empty');
        }
      }
    },
  })
);

const SearchBar = enhance(({
  onEnter,
  ...props
}) => {
  return (
    <input
      className={ styles.searchbar }
      type="text"
      id="textbar"
      name="searchbar"
      placeholder="Search courses..."
      onKeyPress={ onEnter }
    />
  );
});

export default SearchBar;
