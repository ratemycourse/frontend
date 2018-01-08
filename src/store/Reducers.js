import { combineReducers } from 'redux';

const applicationIntialState = {
  loading: true,
};

const applicationReducer = (state = applicationIntialState, action = {}) => {
  switch (action.type) {
  case 'SET_LOADING':
    return {
      ...state,
      loading: action.result,
    };
  default:
    return state;
  }
};

const coursesInitialState = {
  courses: [],
  coursesXSLT: null,
  coursesFetched: false,
  coursesXSLTFetched: false,
  error: null,
};

const courseReducer = (state = coursesInitialState, action = {}) => {
  switch (action.type) {
  case 'GET_SEARCH_REQUEST':
    return {
      ...state,
      coursesFetched: false,
    };

  case 'GET_SEARCH_SUCCESS':
    return {
      ...state,
      courses: action.result,
      coursesFetched: true,
    };

  case 'GET_SEARCH_FAILURE':
    return {
      ...state,
      error: action.result,
    };

  case 'GET_COURSELIST.XSL_REQUEST':
    return {
      ...state,
      coursesXSLTFetched: false,
    };

  case 'GET_COURSELIST.XSL_SUCCESS':
    return {
      ...state,
      coursesXSLT: action.result,
      coursesXSLTFetched: true,
    };

  case 'GET_COURSELIST.XSL_FAILURE':
    return {
      ...state,
      error: action.result,
    };

  default:
    return state;
  }
};

const departmentsInitialState = {
  departments: {},
  departmentsFetched: false,
  visibleDepartments: [],
  error: null,
};

const departmentsReducer = (state = departmentsInitialState, action = {}) => {
  switch (action.type) {
  case 'GET_DEP_REQUEST':
    return {
      ...state,
      departmentsFetched: false,
    };

  case 'GET_DEP_SUCCESS':
    return {
      ...state,
      departments: action.result,
      departmentsFetched: true,
    };

  case 'GET_DEP_FAILURE':
    return {
      ...state,
      error: action.result,
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

const filterInitialState = {
  activeFilter: [],
  inactiveFilter: [],
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

  case 'INIT_FILTER':
    return {
      ...state,
      inactiveFilter: action.result,
    };

  default:
    return state;
  }
};

const userInitialState = {
  currentUserData: {},
  loggedIn: false,
  error: null,
};

const userReducer = (state = userInitialState, action = {}) => {
  switch (action.type) {
  case 'VALIDATE_USER_REQUEST':
    return {
      ...state,
    };

  case 'VALIDATE_USER_SUCCESS':
    return {
      ...state,
      loggedIn: action.result.reply,
      currentUserData: action.result.data,
    };

  case 'VALIDATE_USER_FAILURE':
    return {
      ...state,
      error: action.result,
    };

  case 'LOG_OUT_USER':
    return {
      ...state,
      loggedIn: action.result,
    };

  default:
    return state;
  }
};

const reducer = combineReducers({
  appState: applicationReducer,
  courseState: courseReducer,
  filterState: filterReducer,
  departmentState: departmentsReducer,
  userState: userReducer,
});

export default reducer;


