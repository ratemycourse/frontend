import React from 'react';
import SearchBar from './SearchBar';
import styles from './Header.css';

const Header = () => {
  return (
    <div className={ styles.header }>
      <div className={ styles.logo }>RateMyCourse</div>
      <div className={ styles.searchbar }><SearchBar /></div>
      <div className={ styles.login }>LOG IN</div>
    </div>
  );
};

export default Header;
