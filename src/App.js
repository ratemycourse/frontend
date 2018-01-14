import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import 'bootstrap';

import * as actionCreators from './store/Actions';

import MainPage from './containers/MainPage';
import LoginPage from './containers/LoginPage';
import CoursePage from './containers/CoursePage';
import RegisterPage from './containers/RegisterPage';
import ProfilePage from './containers/ProfilePage';

import './scss/_base.scss';

const enhance = compose(
  lifecycle({
    componentWillMount() {
      this.props.store.dispatch(actionCreators.initData());
    },
  })
);

const App = enhance((props) => {
  return (
    <Provider store={ props.store }>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={ MainPage }
          />
          <Route
            exact
            path="/login"
            component={ LoginPage }
          />
          <Route
            exact
            path="/course/:courseCode"
            component={ CoursePage }
          />
          <Route
            exact
            path="/register"
            component={ RegisterPage }
          />
          <Route
            exact
            path="/profile"
            component={ ProfilePage }
          />
        </Switch>
      </Router>
    </Provider>
  );
});

export default App;
