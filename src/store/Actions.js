import * as apiRequest from '../helperfunctions/ApiRequests';
import xslt from 'xslt';  

export const isLoading = (bool) => {
  return {
    result: bool,
    type: 'SET_LOADING',
  };
};

export const addFilter = (filter) => {
  return {
    result: filter,
    type: 'ADD_FILTER',
  };
};

export const removeFilter = (filter) => {
  return {
    result: filter,
    type: 'REMOVE_FILTER',
  };
};

export const addUserCourseScore = (courseScore) => {
  return {
    result: courseScore,
    type: 'SET_USER_COURSE_SCORE',
  };
};

export const setValidLogin = (value) => {
  return {
    result: value,
    type: 'SET_INVALID_LOGIN',
  };
};

export const showDepartments = (departments, query) => {
  const matches = [];
  if (query.length > 0) {
    const regex = new RegExp(query, 'i');
    for (const department of departments) {
      if (regex.test(department.name)) {
        matches.push(department.code);
      }
    }
  }
  return {
    result: matches,
    type: 'SET_DEP_VISIBLE',
  };
};

export const initData = () => {
  return {
    types: ['GET_INITDATA_REQUEST', 'GET_INITDATA_SUCCESS', 'GET_INITDATA_FAILURE'],
    promise: async () => {
      const departments = await apiRequest.fetchFromAPI('kthapi/departments', 'json');
      const activeFilter = ['DM'];
      const inactiveFilter = departments.map((item) => item.code).filter((item) => item !== activeFilter);
      const courseListXSL = await apiRequest.fetchStatic('courselist.xsl');
      const string = `query?srchstr=&dep='${ activeFilter }'`;
      const courseList = await apiRequest.fetchFromAPI(`search/${ string }`);
      return {
        courseList: courseList,
        departments: departments,
        activeFilter: activeFilter,
        inactiveFilter: inactiveFilter,
        courseListXSL: courseListXSL,
      };
    },
  };
};

export const doSearch = (query = 'empty', filter = []) => {
  const arrayToString = '\'' + filter.join('\',\'') + '\'';
  const string = `query?srchstr=${ query }&dep=${ arrayToString }`;
  return {
    types: ['GET_SEARCH_REQUEST', 'GET_SEARCH_SUCCESS', 'GET_SEARCH_FAILURE'],
    promise: async () => {
      return apiRequest.fetchFromAPI(`search/${ string }`);
    },
  };
};

export const getCourse = (courseCode) => {
  return {
    types: ['GET_COURSE_REQUEST', 'GET_COURSE_SUCCESS', 'GET_COURSE_FAILURE'],
    promise: async () => {
      const coursePageXSL = await apiRequest.fetchStatic('coursepage.xsl');
      const coursePageXML = await apiRequest.fetchFromAPI(`course/${ courseCode }`);
      const coursePage = xslt(coursePageXML, coursePageXSL);
      return coursePage;
    },
  };
};

export const validateUser = (formData) => {
  return {
    types: ['VALIDATE_USER_REQUEST', 'VALIDATE_USER_SUCCESS', 'VALIDATE_USER_FAILURE'],
    promise: () => {
      return apiRequest.postToAPI('user/validate', formData);
    },
  };
};

export const registerUser = (formData) => {
  const payload = new FormData();
  payload.append('json', JSON.stringify(formData));
  return {
    types: ['REGISTER_USER_REQUEST', 'REGISTER_USER_SUCCESS', 'REGISTER_USER_FAILURE'],
    promise: () => {
      return apiRequest.postToAPI('user/reguser', formData);
    },
  };
};


export const submitUserScore = (userID, courseCode, score) => {
  return {
    types: ['SUBMIT_SCORE_REQUEST', 'SUBMIT_SCORE_SUCCESS', 'SUBMIT_SCORE_FAILURE'],
    promise: () => {
      return apiRequest.postToAPI('user/submitscore', {
        userID: userID,
        courseCode: courseCode,
        score: score });
    },
  };
};

export const logOut = () => {
  return {
    type: 'LOG_OUT_USER',
  };
};
