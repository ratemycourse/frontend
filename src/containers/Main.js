import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import * as actionCreators from '../store/Actions';

import CardsView from '../components/CardsView';
import Header from '../containers/Header';
import FilterBar from '../components/FilterBar';
import FilterSearch from '../components/FilterSearch';

import styles from './Main.css';

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
            .then(this.props.isLoading(false));
        });
      }
    },
    componentWillUpdate(nextprops) {
      // this.props.dispatch(actionCreators.doSearch('empty', this.props.filter));
    },
  }),
  withHandlers({
    addFilterHandler: (props) => (e) => {
      props.addFilter(e);
    },
    removeFilterHandler: (props) => (e) => {
      props.removeFilter(e);
    },
    showDepartmentsHandler: (props) => (e) => {
      props.showDepartments(props.departments, e);
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
  addFilterHandler,
  removeFilterHandler,
  showDepartmentsHandler,
}) => {
  return (
    <div>
      <Header
        activeFilter={ activeFilter }
        inactiveFilter={ inactiveFilter }
      />
      <FilterSearch
        headerText="Choose Departments"
        loading={ loading }
        departments={ departments }
        filter={ inactiveFilter }
        visible={ visibleDepartments }
        onClick={ addFilterHandler }
        onSubmit={ showDepartmentsHandler }
      />
      <FilterBar
        headerText="Selected Departments"
        loading={ loading }
        departments={ departments }
        filter={ activeFilter }
        onClick={ removeFilterHandler }
        expanded={ true }
      />
      <CardsView
        loading={ loading }
        courses={ courses }
        coursesXSLT={ coursesXSLT }
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
