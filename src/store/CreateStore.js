import { createStore, applyMiddleware, combineReducers } from 'redux';
import PromiseMiddleware from './PromiseMiddleware';
import * as reducers from './Reducers';

export default function(data) {
  const reducer = combineReducers(reducers);
  const finalCreateStore = applyMiddleware(PromiseMiddleware)(createStore);
  const store = finalCreateStore(reducer, data);

  return store;
}
