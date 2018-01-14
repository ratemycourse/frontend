import React from 'react';
import { connect } from 'react-redux';


const SideBar = () => {
  return (
    <div className="text-white">
      <div>
        <h3>
          <a href="/" className="text-white">
            RateMyCourse
          </a>
        </h3>
         <h4>
          <a href="/profile" className="text-white">
            Profile Info
          </a>
        </h4>
      </div>
      <div>
        <h4>
          <a href="/profile" className="text-white">
            My Ratings
          </a>
        </h4>
      </div>
    </div>
  );
};


export default connect()(SideBar);
