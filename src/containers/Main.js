import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux'; 

import * as actionCreators from '../store/Actions';

import CardsView from '../components/CardsView';
import Header from '../containers/Header';
import FilterBar from '../components/FilterBar';

import styles from './Main.css';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      if (!this.props.coursesFetched || !this.props.coursesXSLTFetched) {
        this.props.dispatch(actionCreators.isLoading(true));
        Promise.all([
          this.props.dispatch(actionCreators.getStatic('courselist.xsl')),
          this.props.dispatch(actionCreators.getDepartments()),
        ]).then(() => {
          this.props.dispatch(actionCreators.initFilter(this.props.departments));
          this.props.dispatch(actionCreators.addFilter('DM'));
          this.props.dispatch(actionCreators.isLoading(false));
        });
      }
    },
  }),
  withHandlers({
    addFilterHandler: (props) => (e) => {
      props.dispatch(actionCreators.addFilter(e));
    },
    removeFilterHandler: (props) => (e) => {
      props.dispatch(actionCreators.removeFilter(e));
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
  addFilterHandler,
  removeFilterHandler,
}) => {
  return (
    <div>
      <Header
        activeFilter={ activeFilter }
        inactiveFilter={ inactiveFilter }
      />
      <FilterBar
        headerText="Choose Departments"
        loading={ loading }
        departments={ departments }
        filter={ inactiveFilter }
        onClick={ addFilterHandler }
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

function mapStateToProps(state) {
  return {
    loading: state.appState.loading,
    courses: state.courseState.courses,
    coursesXSLT: state.courseState.coursesXSLT,
    coursesFetched: state.courseState.coursesFetched,
    coursesXSLTFetched: state.courseState.coursesXSLTFetched,
    departments: state.departmentState.departments,
    activeFilter: state.filterState.activeFilter,
    inactiveFilter: state.filterState.inactiveFilter,
  };
}

export default connect(mapStateToProps)(Main);
