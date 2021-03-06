import { combineReducers } from 'redux';
import LoadingGroup from '../helperFunctions/LoadingGroup';

const loadingInitialState = {
  loadingGroup: new LoadingGroup('first'),
};

const loadingReducer = (state = loadingInitialState, action = {}) => {
  switch (action.type) {
  case 'GET_COURSE_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'GET_COURSE_SUCCESS':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_COURSE_FAILURE':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_SEARCH_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'GET_SEARCH_SUCCESS':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_SEARCH_FAILURE':
    return {
      ...state,
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
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'GET_INITDATA_FAILURE':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'VALIDATE_USER_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'VALIDATE_USER_SUCCESS':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'VALIDATE_USER_FAILURE':
    return {
      ...state,
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
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_SCORE_FAILURE':
    return {
      ...state,
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
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'REGISTER_USER_FAILURE':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_COMMENT_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'SUBMIT_COMMENT_SUCCESS':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_COMMENT_FAILURE':
    return {
      ...state,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  default:
    return state;
  }
};

const errorInitialState = {
  error: null,
};

const errorReducer = (state = errorInitialState, action = {}) => {
  switch (action.type) {
  case 'GET_COURSE_FAILURE':
    return {
      ...state,
      error: action.error,
    };

  case 'GET_SEARCH_FAILURE':
    return {
      ...state,
      error: action.error,
    };

  case 'GET_INITDATA_FAILURE':
    return {
      ...state,
      error: action.error,
    };

  case 'VALIDATE_USER_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'REGISTER_USER_FAILURE':
    return {
      ...state,
      error: action.error,
    };

  case 'SUBMIT_SCORE_FAILURE':
    return {
      ...state,
      error: action.error,
    };

  case 'SUBMIT_COMMENT_FAILURE':
    return {
      ...state,
      error: action.error,
    };

  default:
    return state;
  }
};

const coursePageInitialState = {
  loadingGroup: new LoadingGroup('first'),
  coursePage: null,
  courseCode: null,
  commentEdit: false,
  enableSubmitScore: false,
  commentEditId: null,
  commentTempText: null,
  userScore: null,
  userScoresGiven: {},
  alert: null,
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
      coursePage: action.result.coursePage,
      courseCode: action.result.courseCode,
      loadingGroup: state.loadingGroup.completeFetch(),
      userScore: Object.keys(state.userScoresGiven).includes(action.result.courseCode)
      ? (state.userScoresGiven[action.result.courseCode])
      : (null),
    };

  case 'GET_COURSE_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SET_COMMENT_EDIT':
    return {
      ...state,
      commentEditId: action.result.commentId,
      commentTempText: action.result.commentText,
    };

  case 'SET_ENABLE_SUBMIT':
    return {
      ...state,
      enableSubmitScore: action.result,
    };

  case 'LOG_OUT_USER':
    return {
      ...state,
      enableSubmitScore: false,
      userScore: null,
      userScoresGiven: [],
    };

  case 'SET_ALERT':
    return {
      ...state,
      alert: action.result,
    };

  case 'CLEAR_ALERT':
    return {
      ...state,
      alert: null,
    };

  case 'SET_USER_SCORE':
    return {
      ...state,
      userScore: action.result,
    };

  case 'VALIDATE_USER_SUCCESS':
    return {
      ...state,
      userScoresGiven: action.result.data.userScoresGiven,
    };

  case 'SUBMIT_SCORE_SUCCESS':
    return {
      ...state,
      enableSubmitScore: false,
      userScoresGiven: {...state.userScoresGiven, [action.result.courseCode]: action.result.userScore },
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
  sortFilter: 'name',
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

  case 'SET_SORT_FILTER':
    return {
      ...state,
      sortFilter: action.result,
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
  loggedIn: false,
  invalidLogin: false,
  currentUserData: {
    userId: null,
    userName: null,
    userEmail: null,
    userScoresGiven: [],
    userComments: [],
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
      currentUserData: {...state.currentUserData,
      userScoresGiven: {...state.currentUserData.userScoresGiven, [action.result.courseCode]: action.result.userScore } },
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_SCORE_FAILURE':
    return {
      ...state,
      error: action.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_COMMENT_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'SUBMIT_COMMENT_SUCCESS':
    return {
      ...state,
      currentUserData: {...state.currentUserData,
        userComments: [...state.currentUserData.userComments, action.result.commentId] },
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'SUBMIT_COMMENT_FAILURE':
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
      currentUserData: action.result.reply ? (action.result.data) : (state.currentUserData),
      error: action.result.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'REGISTER_USER_FAILURE':
    return {
      ...state,
      RegistrationSuccessful: action.result.reply,
      error: action.result.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'ALTER_USER_REQUEST':
    return {
      ...state,
      loadingGroup: state.loadingGroup.startFetch(),
    };

  case 'ALTER_USER_SUCCESS':
    return {
      ...state,
      currentUserData: action.result.reply ? ({ userId: action.result.data.userId, userEmail: action.result.data.userEmail, userName: action.result.data.userName, userScoresGiven: state.currentUserData.userScoresGiven, userComments: state.currentUserData.userComments }) : (state.currentUserData),
      error: action.result.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'ALTER_USER_FAILURE':
    return {
      ...state,
      RegistrationSuccessful: action.result.reply,
      error: action.result.error,
      loadingGroup: state.loadingGroup.completeFetch(),
    };

  case 'RESET_USERDATA_ERROR':
    return {
      ...state,
      error: action.result,
    };

  case 'LOG_OUT_USER':
    return {
      ...state,
      loggedIn: false,
      currentUserData: userInitialState.currentUserData,
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
  errorState: errorReducer,
  loadingState: loadingReducer,
});

export default reducer;


