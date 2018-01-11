import parseCourseXML from '../helperFunctions/ParseCourseXML';

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

export const initFilter = (departments) => {
  return {
    result: departments.map((department) => { return department.code; }),
    type: 'INIT_FILTER',
  };
};

export const addUserCourseScore = (courseScore) => {
  return {
    result: courseScore,
    type: 'SET_USER_COURSE_SCORE',
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

export const getStatic = (staticFile) => {
  return {
    types: [`GET_${ staticFile.toUpperCase() }_REQUEST`, `GET_${ staticFile.toUpperCase() }_SUCCESS`, `GET_${ staticFile.toUpperCase() }_FAILURE`],
    promise: () => {
      return fetch(`http://localhost:3000/${ staticFile }`)
      .then((response) => {
        return (response.text());
      })
      .then((data) => {
        return (data);
      });
    },
  };
};

export const getDepartments = () => {
  return {
    types: ['GET_DEP_REQUEST', 'GET_DEP_SUCCESS', 'GET_DEP_FAILURE'],
    promise: () => {
      return fetch('http://localhost:3000/kthapi/departments')
      .then((response) => {
        return (response.json());
      })
      .then((data) => {
        const result = JSON.parse(data).map((item) => { return { code: item.code, name: item.name, hidden: true }; });
        return (result);
      });
    },
  };
};

export const doSearch = (query = 'empty', filter = []) => {
  const arrayToString = '\'' + filter.join('\',\'') + '\'';
  const string = `query?srchstr=${ query }&dep=${ arrayToString }`;
  return {
    types: ['GET_SEARCH_REQUEST', 'GET_SEARCH_SUCCESS', 'GET_SEARCH_FAILURE'],
    promise: () => {
      return fetch(`http://localhost:3000/search/${ string }`)
      .then((response) => {
        return (response.text());
      })
      .then((data) => {
        // const result = parseCourseXML(data, 'course');
        return (data);
      });
    },
  };
};

export const validateUser = (formData) => {
  return {
    types: ['VALIDATE_USER_REQUEST', 'VALIDATE_USER_SUCCESS', 'VALIDATE_USER_FAILURE'],
    promise: () => {
      return fetch('http://localhost:3000/user/validate', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return JSON.parse(response);
      });
    },
  };
};

export const logOut = () => {
  return {
    result: false,
    type: 'LOG_OUT_USER',
  };
};
