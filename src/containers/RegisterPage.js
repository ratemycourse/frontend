import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose, withHandlers, branch, renderComponent } from 'recompose';
import * as actionCreators from '../store/Actions.js';

const isLoggedIn = ({ loggedIn }) => loggedIn;

const redirect = () => <Redirect to="/" />;

const redirectIfLoggedIn = branch(
  isLoggedIn,
  renderComponent(redirect),
);

const enhance = compose(
  redirectIfLoggedIn,
  withHandlers({
    onSubmit: (props) => (e) => {
      e.preventDefault();
      const formData = {
        newUser: document.getElementById('regUserName').value,
        newEmail: document.getElementById('regEmail').value,
        newPassword1: document.getElementById('regPass1').value,
        newPassword2: document.getElementById('regPass2').value,
      };
      props.dispatch(actionCreators.registerUser(formData));
    },
  }),
);

const Register = enhance(({
  onSubmit,
  errormsg,
}) => {
  return (
    <div className="container position-absolute" style={ {top: '71px', bottom: '0px', left: '0px', right: '0px'} }>
      <div className="row justify-content-center align-items-center h-100">
        <form onSubmit={ onSubmit } className="form-control m-0 p-3 w-50">
          <div className="bg-primary text-white text-center rounded p-2 m-2">
            <h3>Register new user</h3>
          </div>
          <div className="m-2">
            <input
              className="form-control"
              id="regUserName"
              type="text"
              placeholder="myFunnyNickName"
            />
          </div>
          <div className="m-2">
            <input
              className="form-control"
              id="regEmail"
              type="text"
              placeholder="myRealMail@kth.se"
            />
          </div>
          <div className="m-2">
            <input
              className="form-control"
              id="regPass1"
              type="password"
              placeholder="Enter password..."
            />
          </div>
          <div className="m-2">
            <input
              className="form-control"
              id="regPass2"
              type="password"
              placeholder="Enter password again..."
            />
          </div>
          <div className="m-2 text-center text-danger">
            {errormsg}
          </div>
          <div className="m-2">
            <input
              className="btn btn-secondary w-100"
              type="submit"
              value="SUBMIT"
            />
          </div>
        </form>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    currentUserData: state.userState.currentUserData,
    loggedIn: state.userState.loggedIn,
    errormsg: state.userState.error,
  };
};


export default connect(mapStateToProps)(Register);
