import { combineReducers } from 'redux';
import LoadingGroup from '../helperFunctions/LoadingGroup';

const coursePageInitialState = {
  loadingGroup: new LoadingGroup('first'),
  coursePage: null,
  coursePageXML: null,
  coursePageXSL: null,
  error: null,
};

const coursePageReducer = (state = coursePageInitialState, action = {}) => {
  switch (action.type) {
  case 'GET_COURSE_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'GET_COURSE_SUCCESS':
    return {
      ...state,
      coursePage: action.result,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_COURSE_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  default:
    return state;
  }
};

const cardsViewInitialState = {
  loadingGroup: new LoadingGroup('first'),
  courseList: '<courses>No search made...</courses>',
  courseListXSL: null,
  error: null,
};

const cardsViewReducer = (state = cardsViewInitialState, action = {}) => {
  switch (action.type) {
  case 'GET_SEARCH_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'GET_SEARCH_SUCCESS':
    return {
      ...state,
      courseList: action.result,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_SEARCH_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_INITDATA_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'GET_INITDATA_SUCCESS':
    return {
      ...state,
      courseList: action.result.courseList,
      courseListXSL: action.result.courseListXSL,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_INITDATA_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  default:
    return state;
  }
};

const filterInitialState = {
  loadingGroup: new LoadingGroup('first'),
  departments: [],
  visibleDepartments: [],
  activeFilter: [],
  inactiveFilter: [],
  error: null,
};

const filterReducer = (state = filterInitialState, action = {}) => {
  switch (action.type) {
  case 'ADD_FILTER':
    return {
      ...state,
      activeFilter: [...state.activeFilter, action.result],
      inactiveFilter: state.inactiveFilter.filter((item) => item !== action.result),
    };

  case 'REMOVE_FILTER':
    return {
      ...state,
      activeFilter: state.activeFilter.filter((item) => item !== action.result),
      inactiveFilter: [...state.inactiveFilter, action.result],
    };

  case 'GET_INITDATA_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'GET_INITDATA_SUCCESS':
    return {
      ...state,
      departments: action.result.departments,
      activeFilter: action.result.activeFilter,
      inactiveFilter: action.result.inactiveFilter,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_INITDATA_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SET_DEP_VISIBLE':
    return {
      ...state,
      visibleDepartments: action.result,
    };

  default:
    return state;
  }
};

const userInitialState = {
  loadingGroup: new LoadingGroup('first'),
  loggedIn: true, // false,
  invalidLogin: false,
  currentUserData: {
    userId: '118', // null,
    name: 'kalle', // --
    password: 'abbaabba', // --
    email: 'kalle@kth.se', // null,
    courseScores: {},
  },
  error: null,
};

const userReducer = (state = userInitialState, action = {}) => {
  switch (action.type) {
  case 'VALIDATE_USER_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'VALIDATE_USER_SUCCESS':
    return {
      ...state,
      loggedIn: action.result.reply,
      invalidLogin: !action.result.reply,
      currentUserData: action.result.data,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'VALIDATE_USER_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_SCORE_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'SUBMIT_SCORE_SUCCESS':
    return {
      ...state,
      currentUserData: {...state.currentUserData, courseScores: {...state.currentUserData.courseScores, [action.result.code]: action.result.score } },
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_SCORE_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'REGISTER_USER_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'REGISTER_USER_SUCCESS':
    return {
      ...state,
      loggedIn: action.result.reply,
      invalidLogin: !action.result.reply,
      currentUserData: action.result.data,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'REGISTER_USER_FAILURE':
    return {
      ...state,
      RegistrationSuccessful: action.result.reply,
      error: action.result.data,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'LOG_OUT_USER':
    return {
      ...state,
      loggedIn: action.result,
    };

  case 'SET_INVALID_LOGIN':
    return {
      ...state,
      invalidLogin: action.result,
    };

  default:
    return state;
  }
};

const reducer = combineReducers({
  cardsViewState: cardsViewReducer,
  coursePageState: coursePageReducer,
  filterState: filterReducer,
  userState: userReducer,
});

export default reducer;


