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
      courses: action.result,
      loading: false,
    };
  case 'GET_COURSES_FAILURE':
    return {
      ...state,
      loading: false,
    };

  case 'GET_STATIC_REQUEST':
    return {
      ...state,
      loading: true,
    };
  case 'GET_STATIC_SUCCESS':
    return {
      ...state,
      staticfile: action.result,
      loading: true,
    };
  case 'GET_STATIC_FAILURE':
    return {
      ...state,
      loading: true,
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
