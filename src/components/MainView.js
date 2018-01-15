import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap';
import CourseListPage from '../containers/CourseListPage';
import LoginPage from '../containers/LoginPage';
import CoursePage from '../containers/CoursePage';
import RegisterPage from '../containers/RegisterPage';
import ProfilePage from '../containers/ProfilePage';

const MainView = (props) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ CourseListPage }
      />
      <Route
        exact
        path="/login"
        render={ () =><LoginPage history={ props.history } /> }
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
  );
};

export default MainView;
