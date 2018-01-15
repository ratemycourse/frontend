import React from 'react';
import { branch, renderComponent } from 'recompose';

const isError = ({ error }) => error;

const errorScreen = (props) => <div >An error has occured: { props.error }</div>;

const ErrorScreenOnError = branch(
  isError,
  renderComponent(errorScreen),
);

export default ErrorScreenOnError;
