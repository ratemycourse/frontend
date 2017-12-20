import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';

export default function App(props) {
  return (
    <Provider store={ props.store }>
      <Main />
    </Provider>
  );
}
