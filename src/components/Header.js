import React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import $ from 'jquery';
import '../scss/Header.scss';

const enhance = (
  compose(
    lifecycle({
      componentDidUpdate() {
        this.props.history.location.pathname === '/' ? ($('#searchGroup').show() && $('#searchGroup').animate({ opacity: 1 }, 500)) : ($('#searchGroup').animate({ opacity: 0 }, 300, () => { $('#searchGroup').hide() }));
      },
    }),
    withHandlers({
      onLoginClick: (props) => () => {
        props.goToLoginHandler();
      },
      onProfileClick: (props) => () => {
        props.goToProfileHandler();
      },
      onSubmit: (props) => (e) => {
        e.preventDefault();
        const query = document.getElementById('courseSearch').value;
        props.searchQueryHandler(query);
      },
      clearSearchText: () => () => {
        document.getElementById('courseSearch').value = '';
      },
    })
  ));

const Header = enhance(({
  onSubmit,
  onLoginClick,
  onProfileClick,
  clearSearchText,
  loggedIn,
  userName,
}) => {
  return (
    <div className="navbar navbar-dark bg-primary">
      <div className="d-flex flex-row w-100 align-items-center">
        <a className="navbar-brand" href="#"><h2>RateMyCourse</h2></a>
        <form className="form-inline w-100 d-flex justify-content-center" onSubmit={ onSubmit }>
          <div className="input-group w-50" id="searchGroup">
            <input
              className="courseSearch form-control w-50"
              id="courseSearch" type="search"
              placeholder="Search courses..."
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="searchButton btn btn-secondary" type="submit">Search</button>
            </div>
            <div className="input-group-append">
              <button
                className="btn btn-outline-grey"
                type="button"
                onClick={ clearSearchText }
              >&#10006;</button>
            </div>
          </div>
        </form>
        <button
          className={ `btn btn-outline-${ loggedIn ? ('tetriary') : ('grey disabled') } h-25 my-2 my-sm-0 m-1` }
          id="profileButton"
          onClick={ onProfileClick }
        >{ userName ? (userName.toUpperCase()) : ('ANONYMOUS') }</button>
        <button
          className="btn btn-outline-secondary h-25 my-2 my-sm-0 m-1"
          onClick={ onLoginClick }
        >{ loggedIn ? ('LOG OUT') : ('LOG IN') }</button>
      </div>
    </div>
  );
});

export default Header;
