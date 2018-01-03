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
        const result = JSON.parse(data).map((item) => { return { code: item.code, name: item.name }; });
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
        const result = parseCourseXML(data, 'course');
        return (result);
      });
    },
  };
};
