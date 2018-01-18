import React from 'react';
import { compose, withHandlers } from 'recompose';
import ControlBar from '../components/ControlBar';
import '../scss/Header.scss';

const enhance = (
  compose(
    withHandlers({
      onLoginClick: (props) => () => {
        props.goToLoginHandler();
      },
      onProfileClick: (props) => () => {
        props.goToProfileHandler();
      },
      onHomeClick: (props) => () => {
        props.goToCourseListHandler();
      },
      onSubmit: (props) => (e) => {
        if (e) {
          e.preventDefault();
        }
        const query = document.getElementById('courseSearch').value;
        props.searchQueryHandler(query);
      },
      clearSearchText: () => () => {
        document.getElementById('courseSearch').value = '';
      },
      onForwardClick: (props) => () => {
        props.onForwardHandler();
      },
      onBackClick: (props) => () => {
        props.onBackHandler();
      },
    })
  ));

const Header = enhance(({
  userName,
  loggedIn,
  onSubmit,
  onLoginClick,
  onProfileClick,
  clearSearchText,
  onBackClick,
  onForwardClick,
  onHomeClick,
}) => {
  return (
    <div className="navbar navbar-dark bg-primary p-3">
      <div className="headerLine d-flex w-100 align-items-center m-0 p-0">
      <div id="controlBar">
        <ControlBar
          size={ 20 }
          onSubmit={ onSubmit }
          onForwardClick={ onForwardClick }
          onBackClick={ onBackClick }
          onHomeClick={ onHomeClick }
        />
        </div>
        <form className="form-inline w-100 d-flex justify-content-center flex-nowrap" onSubmit={ onSubmit }>
          <div className="input-group w-100 flex-nowrap m-1 ml-md-2 mr-md-2 ml-lg-5 mr-lg-5" id="searchGroup">
            <input
              className="courseSearch form-control w-75"
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
          className={ `btn btn-outline-${ loggedIn ? ('tetriary') : ('grey disabled') } h-25 m-1 <ml-auto>  </ml-auto>` }
          id="profileButton"
          onClick={ onProfileClick }
        >{ userName ? (userName.toUpperCase()) : ('ANONYMOUS') }</button>
        <button
          className="btn btn-outline-secondary h-25 m-1"
          id="logButton"
          onClick={ onLoginClick }
        >{ loggedIn ? ('LOG OUT') : ('LOG IN') }</button>
      </div>
    </div>
  );
});

export default Header;
