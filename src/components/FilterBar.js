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
  })
);

const FilterBar = enhance(({
  departments,
  filter,
  onClick,
  headerText,
}) => {
  return (
    <div id="accordion">
      <div className="card">
        <div
          className="card-header"
          role="tab"
          id="headingTwo"
          data-toggle="collapse"
          href="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <h5 className="mb-0" >
            { headerText }
          </h5>
        </div>
        <div
          id="collapseTwo"
          className="collapse show"
          role="tabpanel"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div className="card-body">
            <div className="d-flex flex-wrap">
              { departments.map((department) => {
                if (filter.includes(department.code)) {
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
  );  
});

export default FilterBar;
