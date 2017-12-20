import React from 'react';
import CardsContainer from '../containers/CardsContainer';
import Header from './Header';
import styles from './Main.css';

const Main = () => {
  return (
    <div>
      <Header />
      <CardsContainer />
    </div>
  );
};

export default Main;
