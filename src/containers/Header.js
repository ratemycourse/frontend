import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { compose, withHandlers, lifecycle } from 'recompose';
import * as actionCreators from '../store/Actions';

const enhance = (
  compose(
    lifecycle({
      componentDidMount() {
        if (this.props.loggedIn) {
          $('#profileButton').show();
        } else {
          $('#profileButton').hide();
        }
      },
    }),
    withHandlers({
      logInOrOut: (props) => () => {
        if (props.loggedIn) {
          props.dispatch(actionCreators.logOut());
          $('#profileButton').hide();
        } else {
          props.history.push('/login');
        }
      },
      goToProfile: (props) => () => {
        if (props.loggedIn) {
          props.history.push('/profile');
        }
     },
      handleSubmit: (props) => (e) => {
        e.preventDefault();
        const query = document.getElementById('courseSearch').value;
        props.dispatch(actionCreators.doSearch(query, props.activeFilter));
      },
      clearSearchText: () => () => {
        document.getElementById('courseSearch').value = '';
      },
    })
  ));

const Header = enhance(({
  handleSubmit,
  logInOrOut,
  goToProfile,
  clearSearchText,
  loggedIn,
  userName,
}) => {
  return (
    <div className="navbar navbar-dark bg-primary">
      <div className="d-flex flex-row w-100 align-items-center">
        <a className="navbar-brand" href="#"><h2>RateMyCourse</h2></a>
        <form className="form-inline w-100 d-flex justify-content-center" onSubmit={ handleSubmit }>
          <div className="input-group w-50">
            <input
              className="form-control w-50"
              id="courseSearch" type="search"
              placeholder="Search courses..."
              aria-label="Search"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-grey"
                type="button"
                onClick={ clearSearchText }
              >&#10006;</button>
            </div>
          </div>
          <button className="btn btn-secondary m-2" type="submit">Search</button>
        </form>
        <button
          className="btn btn-outline-tetriary h-25 my-2 my-sm-0 m-1"
          id="profileButton"
          onClick={ goToProfile }
        >{ userName ? (userName.toUpperCase()) : (false) }</button>
        <button
          className="btn btn-outline-secondary h-25 my-2 my-sm-0 m-1"
          onClick={ logInOrOut }
        >{ loggedIn ? ('LOG OUT') : ('LOG IN') }</button>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userState.loggedIn,
    userName: state.userState.currentUserData.name,
  };
};

export default connect(mapStateToProps)(Header);
