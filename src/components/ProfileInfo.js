import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
  withHandlers({
  }),
);

const toggleEdit = () => {
  const pass2 = document.getElementById('password2ID');
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

const Submit = () => {
  console.log('SUBMITTING INFORMATION BLEEP BLOOP!');
  if (document.getElementById('nameID').value !== '') {
    console.log('New name is: ', document.getElementById('nameID').value);
  } if (document.getElementById('emailID').value !== '') {
    console.log('New email is: ', document.getElementById('emailID').value);
  }
};

const Info = enhance(({
  userName,
  userEmail,
  userPass,
}) => {
  return (
    <div>
      User Name: <input type="text" id="nameID" placeholder={ userName } disabled />
      <div>
        E-mail: <input type="text" id="emailID" placeholder={ userEmail } disabled />
      </div>
      <div>
        Password: <input type="password" id="passwordID" placeholder='*****' disabled />
      </div>
      <div id="password2ID" style={ {display: 'none' } }>
        Password: <input type="password" placeholder='*****' />
      </div>
      <div>
        <button id="editButtonID" onClick={ toggleEdit }>
          Edit
        </button>
      </div>
      <div id="submitID" style={ {display: 'none' } }>
        <button onClick={ Submit }>
          Submit
        </button>
      </div>
    </div>
  );
});


export default connect()(Info);
