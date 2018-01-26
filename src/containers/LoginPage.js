import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, withHandlers, lifecycle } from 'recompose';
import * as actionCreators from '../store/Actions.js';

const redirectIfLoggedIn = lifecycle({
  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.goBack();
    }
  },
});

const enhance = compose(
  redirectIfLoggedIn,
  withHandlers({
    onSubmit: (props) => (e) => {
      e.preventDefault();
      const formData = {
        user: document.getElementById('userName').value,
        password: document.getElementById('userPass').value,
      };
      props.dispatch(actionCreators.validateUser(formData));
    },
    onHideClick: (props) => () => {
      props.dispatch(actionCreators.setValidLogin(false));
    },
  })
);

const Login = enhance(({
  onSubmit,
  onHideClick,
  invalidLogin,
}) => {
  return (
    <div className="container position-absolute" style={ {top: '71px', bottom: '0px', left: '0px', right: '0px'} }>
      <div className="row justify-content-center align-items-center h-100">
        <form onSubmit={ onSubmit } className="form-control m-0 p-3 w-50">
          <div className="bg-primary text-white text-center rounded p-2 m-2">
            <h3>RateMyCourse</h3>
          </div>
          <div className="m-2">
            <input
              className="form-control"
              id="userName"
              type="text"
              placeholder="User name or E-mail..."
            />
          </div>
          <div className="m-2">
            <input
              className="form-control"
              id="userPass"
              type="password"
              placeholder="Enter password..."
            />
          </div>
          <div className="m-2">
            <input
              className="btn btn-secondary w-100"
              type="submit"
              value="LOG IN"
            />
          </div>
          <div
            className="alert alert-danger m-2 alert-dismissible"
            style={ {display: (invalidLogin) ? ('block') : ('none')} }
            role="alert"
          >
            Invalid user or password,  please try again.
            <button
              type="button" className="close"
              onClick={ onHideClick } aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="text-center">
            ...Or register: <Link to="/register">HERE</Link>
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
    error: state.userState.error,
    invalidLogin: state.userState.invalidLogin,
  };
};

export default connect(mapStateToProps)(Login);
