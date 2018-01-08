import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { compose, withHandlers, lifecycle, branch, renderComponent } from 'recompose';
import * as actionCreators from '../store/Actions.js';
import styles from './Login.css';

const isLoggedIn = ({ loggedIn }) => loggedIn;

const redirect = () => <Redirect to="/" />;

const redirectIfLoggedIn = branch(
  isLoggedIn,
  renderComponent(redirect),
);

const enhance = compose(
  redirectIfLoggedIn,
  lifecycle({
    componentWillReceiveProps(nextprops) {
      if (nextprops.validateResponse) {
        document.getElementById('userName').disabled = true;
        document.getElementById('userName').value = '';
        document.getElementById('userPass').disabled = true;
        document.getElementById('userPass').value = '';
      } else {
        console.log('NOT VALIDATED USER');
      }
    },
  }),
  withHandlers({
    handleSubmit: (props) => (e) => {
      console.log(e);
    },
    onEnter: (props) => (e) => {
      if (e.key === 'Enter') {
        const formData = {
          user: document.getElementById('userName').value,
          password: document.getElementById('userPass').value,
        };
        props.dispatch(actionCreators.validateUser(formData));
      }
    },
  })
);

const Login = enhance(({
  onEnter,
}) => {
  return (
    <div onKeyPress={ onEnter } className={ styles.loginbox }>
      <div>
        <input
          id="userName"
          type="text"
          placeholder="User name or E-mail..."
        />
      </div>
      <div>
        <input
          id="userPass"
          type="password"
          placeholder="Enter password..."
        />
      </div>
      <div>
        ...Or register: <Link to="/register">HERE</Link>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    currentUserData: state.userState.currentUserData,
    loggedIn: state.userState.loggedIn,
    error: state.userState.error,
  };
};


export default connect(mapStateToProps)(Login);
