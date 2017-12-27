export function GetCourses(department) {
  return {
    types: ['GET_COURSES_REQUEST', 'GET_COURSES_SUCCESS', 'GET_COURSES_FAILURE'],
    promise: () => {
      return fetch(`http://localhost:3000/kthapi/courses/${ department }`)
      .then((response) => {
        return (response.text());
      })
      .then((data) => {
        return (data);
      });
    },
  };
}

export function GetStatic(staticFile) {
  return {
    types: ['GET_STATIC_REQUEST', 'GET_STATIC_SUCCESS', 'GET_STATIC_FAILURE'],
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
}
