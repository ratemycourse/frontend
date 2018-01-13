import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import * as actionCreators from '../store/Actions';

import CardsView from '../components/CardsView';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import FilterSearch from '../components/FilterSearch';

const enhance = compose(
  withHandlers({
    addFilterHandler: (props) => (e) => {
      props.addFilter(e);
      props.doSearch(document.getElementById('courseSearch').value, [...props.activeFilter, e]);
    },
    removeFilterHandler: (props) => (e) => {
      props.removeFilter(e);
      props.doSearch(document.getElementById('courseSearch').value, props.activeFilter.filter((item) => item !== e));
    },
    showDepartmentsHandler: (props) => (e) => {
      props.showDepartments(props.departments, e);
    },
    searchQueryHandler: (props) => (e) => {
      props.doSearch(e, props.activeFilter);
    },
    goToCoursePageHandler: (props) => (e) => {
      props.history.push(`/course/${ e }`);
    },
    goToProfileHandler: (props) => () => {
      if (props.loggedIn) {
        props.history.push('/profile');
      }
    },
    goToLoginHandler: (props) => () => {
      if (props.loggedIn) {
        props.logOut();
      } else {
        props.history.push('/login');
      }
    },
  }),
);

const Main = enhance(({
  // Course props.
  courseList,
  courseListXSL,
  cardViewLoading,
  cardViewError,
  // Filter props.
  departments,
  activeFilter,
  inactiveFilter,
  visibleDepartments,
  filterLoading,
  filterStateError,
  // User props,
  userName,
  loggedIn,
  userCourseScores,
  // Eventhandlers.
  addFilterHandler,
  removeFilterHandler,
  showDepartmentsHandler,
  searchQueryHandler,
  goToLoginHandler,
  goToCoursePageHandler,
  goToProfileHandler,
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
        />
      </div>
      <FilterSearch
        headerText="Choose departments"
        loading={ filterLoading }
        error={ filterStateError }
        departments={ departments }
        filter={ inactiveFilter }
        visible={ visibleDepartments }
        onClick={ addFilterHandler }
        onSubmit={ showDepartmentsHandler }
      />
      <FilterBar
        headerText="Selected departments"
        loading={ filterLoading }
        error={ filterStateError }
        departments={ departments }
        filter={ activeFilter }
        onClick={ removeFilterHandler }
      />
      <CardsView
        loading={ cardViewLoading }
        error={ cardViewError }
        courseList={ courseList }
        courseListXSL={ courseListXSL }
        userCourseScores={ userCourseScores }
        goToCoursePageHandler={ goToCoursePageHandler }
      />
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    // CardView props.
    cardViewLoading: state.cardsViewState.loadingGroup.isLoading,
    courseList: state.cardsViewState.courseList,
    courseListXSL: state.cardsViewState.courseListXSL,
    cardViewError: state.cardsViewState.Error,
    // Filter props.
    visibleDepartments: state.filterState.visibleDepartments,
    activeFilter: state.filterState.activeFilter,
    inactiveFilter: state.filterState.inactiveFilter,
    filterLoading: state.filterState.loadingGroup.isLoading,
    departments: state.filterState.departments,
    filterStateError: state.filterState.Error,
    // User props.
    userCourseScores: state.userState.currentUserData.courseScores,
    loggedIn: state.userState.loggedIn,
    userName: state.userState.currentUserData.name,
    userStateError: state.userState.Error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: async (courseCode) => { await dispatch(actionCreators.getCourse(courseCode))},
    addFilter: (filter) => { dispatch(actionCreators.addFilter(filter)); },
    removeFilter: (filter) => { dispatch(actionCreators.removeFilter(filter)); },
    showDepartments: (departments, query) => { dispatch(actionCreators.showDepartments(departments, query)); },
    doSearch: async (query, filter) => { await dispatch(actionCreators.doSearch(query, filter)); },
    logOut: () => { dispatch(actionCreators.logOut()); },
    addUserCourseScore: (course, score) => { dispatch(actionCreators.addUserCourseScore(course, score)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
