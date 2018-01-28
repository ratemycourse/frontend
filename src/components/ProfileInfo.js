import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import * as actionCreators from '../store/Actions.js';

const enhance = compose(
  withHandlers({
  onSubmit: (props) => (e) => {
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
      const formData = {
        userID: props.userID,
        newUser: userName,
        newEmail: userEmail,
        newPassword1: userPass1,
        newPassword2: userPass2,
        reg: false,
      };
      props.onSubmit(formData).then( () => { props.onEdit(); });
      document.getElementById('passwordID').value = '';
      document.getElementById('passwordID2').value = '';

    },
    onEdit: (props) => () => {
      props.resetError();
      props.onEdit(true);
      document.getElementById('nameID').value = props.userName;
      document.getElementById('emailID').value = props.userEmail;
      document.getElementById('passwordID').value = '';
      document.getElementById('passwordID2').value = '';
    },
  }),
);


const Info = enhance(({
  userID,
  userName,
  userEmail,
  errormsg,
  onSubmit,
  toggleEdit,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded m-4 p-4">
      <div className="input-group mb-1">
        <div className="input-group-prepend w-25">
          <span className="input-group-text bg-grey text-white">Name:</span>
        </div>
        <input
          type="text"
          id="nameID"
          className="form-control"
          defaultValue={ userName }
          disabled={ !toggleEdit }
        />
      </div>
      <div className="input-group mb-1">
        <div className="input-group-prepend w-25">
          <span className="input-group-text bg-grey text-white">Email:</span>
        </div>
        <input
          type="text"
          id="emailID"
          className="form-control"
          defaultValue={ userEmail }
          disabled={ !toggleEdit }
        />
      </div>
      <div className="input-group mb-1">
        <div className="input-group-prepend w-25">
          <span className="input-group-text bg-grey w-100 text-white">Pass:</span>
        </div>
        <input
          type="password"
          id="passwordID"
          className="form-control"
          placeholder="*****"
          disabled={ !toggleEdit }
        />
      </div>
      <div className="input-group mb-1" id="password2Div" style={ { display: `${ toggleEdit ? 'inline-flex' : 'none' }`} }>
        <div className="input-group-prepend w-25">
          <span className="input-group-text bg-grey w-100 text-white">Pass:</span>
        </div>
        <input
          type="password"
          id="passwordID2"
          className="form-control"
          placeholder="*****"
        />
      </div>
      <div className="m-2 text-center text-danger">
        {errormsg}
      </div>
      <div className="d-flex ">
        <button
          id="editButtonID"
          onClick={ onEdit }
          type="submit"
          className="btn btn-tetriary ml-auto"
        >
        { toggleEdit ? 'Back' : 'Edit' }
        </button>
        <button
          id="submitID"
          style={ {display: `${ toggleEdit ? 'block' : 'none' }` } }
          onClick={ onSubmit }
          type="submit"
          className="btn btn-secondary ml-2"
        >
          Apply
        </button>
      </div>
    </div>
  );
});


export default Info;
