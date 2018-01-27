import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import * as actionCreators from '../store/Actions.js';

const mapStateToProps = (state) => {
  return {
    errormsg: state.userState.error,
  };
};

const enhance = compose(
  withHandlers({
    onSubmit: (props) => (e) => {
      e.preventDefault();
      let userName = document.getElementById('nameID').value;
      let userEmail = document.getElementById('emailID').value;
      let userPass1 = document.getElementById('passwordID').value;
      let userPass2 = document.getElementById('passwordID2').value;
      if (userName === '') {
        userName = props.userName;
      }
      if (userEmail === '') {
        userEmail = props.userEmail;
      }
      if (userPass1 === '') {
        userPass1 = false;
      }
      if (userPass2 === '') {
        userPass2 = false;
      }
      console.log('WHAT THE F. name:', userName, 'email:', userEmail, 'pass1:', userPass1, 'pass2:', userPass2);
      const formData = {
        userID: props.userID,
        newUser: userName,
        newEmail: userEmail,
        newPassword1: userPass1,
        newPassword2: userPass2,
        reg: false,
      };
      props.alterUser(formData);
    },
  }),
);
const toggleEdit = () => {
  const pass2 = document.getElementById('password2Div');
  if (pass2.style.display === 'none') {
    pass2.style.display = 'block';
    document.getElementById('editButtonID').textContent = 'Back';
    document.getElementById('submitID').style.display = 'block';
    document.getElementById('nameID').disabled = false;
    document.getElementById('emailID').disabled = false;
    document.getElementById('passwordID').disabled = false;
  } else {
    pass2.style.display = 'none';
    document.getElementById('editButtonID').textContent = 'Edit';
    document.getElementById('submitID').style.display = 'none';
    document.getElementById('nameID').disabled = true;
    document.getElementById('emailID').disabled = true;
    document.getElementById('passwordID').disabled = true;
  }
};


const Info = enhance(({
  userID,
  userName,
  userEmail,
  errormsg,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded m-4 p-2">
      <div id="userID">
        { userID }
      </div>
      <div className="text-primary text-right rounded p-2 m-2">
        hello User { userID } Name:
        <input
          type="text"
          id="nameID"
          className="rounded"
          placeholder={ userName }
          disabled
        />
      </div>
      <div className="text-primary text-right rounded p-2 m-2">
        E-mail:
        <input
          type="text"
          id="emailID"
          className="rounded"
          placeholder={ userEmail }
          disabled
        />
      </div>
      <div className="text-primary text-right rounded p-2 m-2">
        Password:
        <input
          type="password"
          id="passwordID"
          className="rounded"
          placeholder="*****"
          disabled
        />
      </div>
      <div
        id="password2Div"
        style={ {display: 'none' } }
        className="text-primary text-right rounded p-2 m-2"
      >
        Password:
        <input
          type="password"
          id="passwordID2"
          className="rounded"
          placeholder="*****"
        />
      </div>
      <div className="m-2 text-center text-danger">
        {errormsg}
      </div>
      <div className="d-flex ">
        <button
          id="editButtonID"
          onClick={ toggleEdit }
          type="submit"
          className="btn btn-grey m-2 "

        >
          Edit
        </button>
        <button
          id="submitID"
          style={ {display: 'none' } }
          onClick={ onSubmit }
          type="submit"
          className="btn btn-secondary m-2"
        >
          Apply
        </button>
      </div>
    </div>
  );
});


export default connect(mapStateToProps)(Info);
