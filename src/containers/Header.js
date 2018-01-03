import React from 'react'; 
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { NavLink } from 'react-router-dom';
import * as actionCreators from '../store/Actions';
import SearchBar from '../components/SearchBar';
import styles from './Header.css';

const enhance = (
  compose(
    withHandlers({
      handleSubmit: (props) => (query) => {
        props.dispatch(actionCreators.doSearch(query, props.activeFilter));
      },
    })
  ));

const Header = enhance(({
  handleSubmit,
}) => {
  return (
    <div className={ styles.header }>
      <div className={ styles.logo }>RateMyCourse</div>
      <div className={ styles.searchbar } ><SearchBar handleSubmit={ handleSubmit } /></div>
      <div className={ styles.login }><NavLink to="/login">LOG IN</NavLink></div>
    </div>
  );
});

export default connect()(Header);
