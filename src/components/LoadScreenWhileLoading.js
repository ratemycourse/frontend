import React from 'react';
import { branch, renderComponent } from 'recompose';

import styles from './LoadScreenWhileLoading.css';

const isLoading = ({ loading }) => loading;

const loadScreen = () => <div className={ styles.container }><div className={ styles.loader } /></div>;

const LoadScreenWhileLoading = branch(
  isLoading,
  renderComponent(loadScreen),
);

export default LoadScreenWhileLoading;
