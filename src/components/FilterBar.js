import React from 'react';
import { compose, withHandlers } from 'recompose';

import '../scss/FilterBar.scss';

const enhance = compose(
  withHandlers({
    onClick: (props) => (e) => {
      props.onClick(e);
    },
  })
);

const FilterBar = enhance(({
  headerText,
  departments,
  filter,
  onClick,
  setSortFilter,
}) => {
  return (
    <div id="accordion">
      <div className="card">
        <div
          className="card-header p-0"
          role="tab"
          id="headingTwo"
        >
          <div className="d-flex align-items-center p-0 pr-3">
            <h6
              className="p-2 m-0"
              style={ {flex: 'auto'} }
              data-toggle="collapse"
              href="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            > { headerText }
            </h6>
            <h6 className="mr-2 font-weight-bold"> Order by:</h6>
            <div className="pt-1">
              <label className="radio-inline">Name&nbsp;<input type="radio" name="optradio" onClick={ () => setSortFilter('name ASC') } />&nbsp;</label>
              <label className="radio-inline">Rating&nbsp;<input type="radio" name="optradio" onClick={ () => setSortFilter('score DESC') } />&nbsp;</label>
              <label className="radio-inline">Comments&nbsp;<input type="radio" name="optradio" onClick={ () => setSortFilter('sumComments DESC') } />&nbsp;</label>
            </div>
          </div>
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
