import React, {Component} from 'react';
import styles from './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <input
        className={ styles.searchbar } type="text"
        id="fname" name="searchbar"
        placeholder="Search courses..."
      />
    );
  }
}

export default SearchBar;
