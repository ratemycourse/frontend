import React from 'react'; 
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { NavLink } from 'react-router-dom';
import * as actionCreators from '../store/Actions';
import InputBox from '../components/InputBox';
import styles from './Header.css';

const enhance = (
  compose(
    withHandlers({
      logOut: (props) => () => { props.dispatch(actionCreators.logOut()); },
      handleSubmit: (props) => (query) => {
        props.dispatch(actionCreators.doSearch(query, props.activeFilter));
      },
    })
  ));

const logText = (loggedIn, logOut) => {
  return (loggedIn ? (<a
    href="#" className={ styles.login }
    onClick={ logOut }>LOG OUT</a>) : (<NavLink to="/login" className={ styles.login }>LOG IN</NavLink>));
};

const Header = enhance(({
  handleSubmit,
  logOut,
  loggedIn,
}) => {
  return (
    <div className={ styles.header }>
      <div className={ styles.logo }>RateMyCourse</div>
      <div className={ styles.inputbox } >
        <InputBox
          handleSubmit={ handleSubmit }
          placeholder="Search Courses..."
          id="courseSearch"
          type="text"
        />
      </div>
      <div className={ styles.login }>{ logText(loggedIn, logOut) }</div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userState.loggedIn,
  };
};

export default connect(mapStateToProps)(Header);
