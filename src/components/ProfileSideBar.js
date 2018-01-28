import React from 'react';
import { connect } from 'react-redux';


const SideBar = (props) => {
  return (
    <div className="text-white">
      <div>
        <div className="btn btn-outline-secondary mt-2 mb-2 w-100" onClick={ props.goToProfile }>
          Profile Info
        </div>
      </div>
      <div>
        <div className="btn btn-outline-secondary w-100" onClick={ props.goToMyRatings }>
            My Ratings
        </div>
      </div>
    </div>
  );
};


export default connect()(SideBar);
