import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import PromiseMiddleware from './PromiseMiddleware';
import reducer from './Reducers';

export default function(data) {
  const finalCreateStore = applyMiddleware(PromiseMiddleware, logger)(createStore);
  const store = finalCreateStore(reducer, data);

  return store;
}
