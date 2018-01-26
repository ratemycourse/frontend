import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';

import * as actionCreators from '../store/Actions';
import Header from '../components/Header';
import MainView from '../components/MainView';

const enhance = compose(
  lifecycle({
    componentWillMount() {
      this.props.initData();
    },
  }),
  withHandlers({
    searchQueryHandler: (props) => (e) => {
      props.doSearch(e, props.activeFilter);
    },
    goToProfileHandler: (props) => () => {
      if (props.loggedIn && props.history.location.pathname !== '/login') {
        props.history.push('/profile');
      }
    },
    goToLoginHandler: (props) => () => {
      if (props.loggedIn) {
        props.logOut();
      } else {
        if (props.history.location.pathname !== '/login') {
          props.history.push('/login');
        }
      }
    },
    goToCourseListHandler: (props) => () => {
      console.log('going home');
      props.history.push('/');
    },
    onBackHandler: (props) => () => { props.history.goBack() },
    onForwardHandler: (props) => () => { props.history.goForward() },

  }),
);

const MainPage = enhance(({
  loggedIn,
  userName,
  history,
  error,
  loading,
  goToLoginHandler,
  goToCourseListHandler,
  goToProfileHandler,
  searchQueryHandler,
  onBackHandler,
  onForwardHandler,
}) => {
  return (
    <div>
      <div className="fixed-top">
        <Header
          loggedIn={ loggedIn }
          userName={ userName }
          goToLoginHandler={ goToLoginHandler }
          goToProfileHandler={ goToProfileHandler }
          searchQueryHandler={ searchQueryHandler }
          goToCourseListHandler={ goToCourseListHandler }
          onBackHandler={ onBackHandler }
          onForwardHandler={ onForwardHandler }
          history={ history }
        />
      </div>
      <div className="headerSpacing" />
      <MainView
        history={ history }
        error={ error }
        loading={ loading }
      />
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loading: state.loadingState.loadingGroup.isLoading,
    // User props.
    loggedIn: state.userState.loggedIn,
    userName: state.userState.currentUserData.userName,
    activeFilter: state.filterState.activeFilter,
    // Promise errors.
    error: state.errorState.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSearch: async (query, filter) => { await dispatch(actionCreators.doSearch(query, filter)); },
    logOut: () => { dispatch(actionCreators.logOut()); },
    initData: () => { dispatch(actionCreators.initData()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
