import React from 'react';
import { compose, withHandlers } from 'recompose';
import ErrorScreenOnError from '../enhancers/ErrorScreenOnError';
import '../scss/FilterBar.scss';

const enhance = compose(
  ErrorScreenOnError,
  withHandlers({
    onClick: (props) => (e) => {
      props.onClick(e);
    },
    handleSubmit: (props) => (e) => {
      e.preventDefault();
      props.onSubmit(document.getElementById('departmentSearch').value);
    },
    clearSearchBar: () => () => {
      document.getElementById('departmentSearch').value = '';
    },
  })
);

const FilterBar = enhance(({
  departments,
  filter,
  visible,
  headerText,
  onClick,
  handleSubmit,
  clearSearchBar,
}) => {
  return (
    <div className="filterWrapper">
      <div id="accordion">
        <div className="card">
          <div
            className="card-header"
            role="tab"
            id="headingOne"
            data-toggle="collapse"
            href="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5 className="mb-0" >
              { headerText }
            </h5>
          </div>
          <div
            id="collapseOne"
            className="collapse"
            role="tabpanel"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              <form className="form-inline w-100 d-flex" onSubmit={ handleSubmit }>
                <div className="input-group searchbar">
                  <input
                    className="form-control"
                    placeholder="Search department..."
                    id="departmentSearch"
                    type="text"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-grey"
                      type="button"
                      onClick={ clearSearchBar }
                    >&#10006;</button>
                  </div>
                </div>
                <button
                  className="btn btn-tetriary my-2 my-sm-0 m-2"
                  type="submit"
                >Search</button>
              </form>
              <div className="d-flex flex-wrap pt-3">
                { departments.map((department) => {
                  if (filter.includes(department.code) && visible.includes(department.code)) {
                    return (
                      <button
                        key={ department.code }
                        className="btn btn-grey m-1"
                        type="button"
                        onClick={ onClick.bind(this, department.code) }
                      >{ department.name }</button>
                    );
                  }
                }) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FilterBar;
