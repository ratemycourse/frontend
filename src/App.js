import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap';

import Main from './containers/Main';
import Login from './containers/Login';

import './scss/_base.scss';

const App = (props) => {
  return (
    <Provider store={ props.store }>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={ Main }
          />
          <Route
            path="/login"
            component={ Login }
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
