import React from 'react';
import { compose, withHandlers } from 'recompose';
import * as actionCreators from '../store/Actions.js';

const enhance = compose(
  withHandlers({
    onSubmit: (props) => (e) => {
      e.preventDefault();
      const formData = {
        userID: document.getElementById('userID').value,
        newUser: document.getElementById('nameID').value,
        newEmail: document.getElementById('emailID').value,
        newPassword1: document.getElementById('passwordID').value,
        newPassword2: document.getElementById('passwordID2').value,
        reg: false,
      };
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
        hello { userID }
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
      <div className="m-2 text-center text-danger">
        {errormsg}
      </div>
    </div>
  );
});

export default Info;
