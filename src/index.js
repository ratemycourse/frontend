import React from 'react';
import ReactDOM from 'react-dom';
import CreateStore from './store/CreateStore';
import App from './App';

const store = CreateStore();
ReactDOM.render(
  <App store={ store } />,
  document.getElementById('app')
);
