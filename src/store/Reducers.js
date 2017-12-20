import Immutable from 'seamless-immutable';
import { combineReducers } from 'redux';

const dataInitialState = {
  courses: {},
  loading: true,
};

function dataReducer(state = dataInitialState, action = {}) {
  switch (action.type) {
  case 'GET_COURSES_REQUEST':
    return {
      ...state,
      loading: true,
    };
  case 'GET_COURSES_SUCCESS':
    return {
      ...state,
      courses: action.result.courses,
      loading: false,
    };
  case 'GET_COURSES_FAILURE':
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
}

const cardsInitialState = {
  cardsByID: null,
};

function cardsReducer(state = cardsInitialState, action = {}) {
  switch (action.type) {
  case 'GET_COURSES_SUCCESS':
    return {
      ...state,
      cardsByID: action.cardsByID,
    };
  default:
    return state;
  }
}

const reducer = combineReducers({
  data: dataReducer,
  cards: cardsReducer,
});

export default reducer;
