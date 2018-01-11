import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import * as actionCreators from '../store/Actions';

import CardsView from '../components/CardsView';
import Header from '../containers/Header';
import FilterBar from '../components/FilterBar';
import FilterSearch from '../components/FilterSearch';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      if (!this.props.coursesFetched || !this.props.coursesXSLTFetched) {
        this.props.isLoading(true);
        Promise.all([
          this.props.getStatic('courselist.xsl'),
          this.props.getDepartments(),
        ]).then(() => {
          this.props.initFilter(this.props.departments);
          this.props.addFilter('DM');
          this.props.doSearch('empty', this.props.activeFilter)
            .then(() => { this.props.isLoading(false); });
        });
      }
    },
  }),
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
    addUserCourseScorehandler: (props) => (e) => {
      props.addUserCourseScore(e);
    },
  }),
);

const Main = enhance(({
  loading,
  courses,
  coursesXSLT,
  departments,
  activeFilter,
  inactiveFilter,
  visibleDepartments,
  userCourseScores,
  addFilterHandler,
  removeFilterHandler,
  showDepartmentsHandler,
  addUserCourseScorehandler,
  history,
}) => {
  return (
    <div className="container-fluid p-0">
      <Header
        activeFilter={ activeFilter }
        inactiveFilter={ inactiveFilter }
        history={ history }
      />
      <FilterSearch
        headerText="Choose departments"
        loading={ loading }
        departments={ departments }
        filter={ inactiveFilter }
        visible={ visibleDepartments }
        onClick={ addFilterHandler }
        onSubmit={ showDepartmentsHandler }
      />
      <FilterBar
        headerText="Selected departments"
        loading={ loading }
        departments={ departments }
        filter={ activeFilter }
        onClick={ removeFilterHandler }
      />
      <CardsView
        loading={ loading }
        courses={ courses }
        coursesXSLT={ coursesXSLT }
        userCourseScores={ userCourseScores }
        onClick={ addUserCourseScorehandler }
      />
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loading: state.appState.loading,
    courses: state.courseState.courses,
    coursesXSLT: state.courseState.coursesXSLT,
    coursesFetched: state.courseState.coursesFetched,
    coursesXSLTFetched: state.courseState.coursesXSLTFetched,
    departments: state.departmentState.departments,
    activeFilter: state.filterState.activeFilter,
    inactiveFilter: state.filterState.inactiveFilter,
    visibleDepartments: state.departmentState.visibleDepartments,
    userCourseScores: state.userState.currentUserData.courseScores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatic: async (staticfile) => { await dispatch(actionCreators.getStatic(staticfile)); },
    isLoading: (bool) => { dispatch(actionCreators.isLoading(bool)); },
    getDepartments: async () => { await dispatch(actionCreators.getDepartments()); },
    initFilter: (departments) => { dispatch(actionCreators.initFilter(departments)); },
    addFilter: (filter) => { dispatch(actionCreators.addFilter(filter)); },
    removeFilter: (filter) => { dispatch(actionCreators.removeFilter(filter)); },
    showDepartments: (departments, query) => { dispatch(actionCreators.showDepartments(departments, query)); },
    doSearch: async (query, filter) => { await dispatch(actionCreators.doSearch(query, filter)); },
    addUserCourseScore: (course, score) => { dispatch(actionCreators.addUserCourseScore(course, score)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
