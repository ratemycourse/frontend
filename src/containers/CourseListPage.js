import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import * as actionCreators from '../store/Actions';

import CardsView from '../components/CardsView';
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
    goToCoursePageHandler: (props) => (e) => {
      props.history.push(`/course/${ e }`);
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
  userCourseScores,
  // Eventhandlers.
  addFilterHandler,
  removeFilterHandler,
  showDepartmentsHandler,
  goToCoursePageHandler,
  refreshCourses,
}) => {
  return (
    <div>
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
        refreshCourses={ refreshCourses }
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
    cardViewError: state.cardsViewState.error,
    // Filter props.
    visibleDepartments: state.filterState.visibleDepartments,
    activeFilter: state.filterState.activeFilter,
    inactiveFilter: state.filterState.inactiveFilter,
    filterLoading: state.filterState.loadingGroup.isLoading,
    departments: state.filterState.departments,
    filterStateError: state.filterState.error,
    // User props.
    userCourseScores: state.userState.currentUserData.courseScores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFilter: (filter) => { dispatch(actionCreators.addFilter(filter)); },
    removeFilter: (filter) => { dispatch(actionCreators.removeFilter(filter)); },
    showDepartments: (departments, query) => { dispatch(actionCreators.showDepartments(departments, query)); },
    doSearch: async (query, filter) => { await dispatch(actionCreators.doSearch(query, filter)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
