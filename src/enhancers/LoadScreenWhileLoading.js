import React from 'react';
import { branch, renderComponent } from 'recompose';

import '../scss/LoadScreenWhileLoading.scss';

const isLoading = ({ loading }) => loading;

const loadScreen = () => <div className="loadingContainer"><div className="loader" /></div>;

const LoadScreenWhileLoading = branch(
  isLoading,
  renderComponent(loadScreen),
);

export default LoadScreenWhileLoading;
