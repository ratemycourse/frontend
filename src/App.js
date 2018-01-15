import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap';

import MainPage from './containers/MainPage';

import './scss/_base.scss';

const App = (props) => {
  return (
    <Provider store={ props.store }>
      <Router>
        <Route path="/" component={ MainPage } />
      </Router>
    </Provider>
  );
};

export default App;
