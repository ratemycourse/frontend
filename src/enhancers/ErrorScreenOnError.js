import React from 'react';
import { branch, renderComponent } from 'recompose';

const ErrorPage = (props) => {
  return (
    <div className="d-block text-center p-3 bg-warning"><h4 class="text-white">An error has occured: <div className="text-danger font-weight-bold">{ props.error.toString() }</div></h4></div>
    );
};

const isError = ({ error }) => error;

const errorScreen = (props) => <ErrorPage error={ props.error } />;

const ErrorScreenOnError = branch(
  isError,
  renderComponent(errorScreen),
);

export default ErrorScreenOnError;
