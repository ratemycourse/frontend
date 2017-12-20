export function GetCourses() {
  return {
    types: ['GET_COURSES_REQUEST', 'GET_COURSES_SUCCESS', 'GET_COURSES_FAILURE'],
    promise: () => {
      return fetch('http://localhost:3000/')
      .then((response) => {
        return (response.json());
      })
      .then((data) => {
        const courses = {};
        data.forEach((course) => {
          courses[course.code] = {
            'code': course.code,
            'link': course.href,
            'title': course.title,
            'description': course.info,
            'active': course.state,
            'credits': course.credits,
            'level': course.level,
            'rating': null,
            'comments:': {},
            'visibility': true,
          };
        });
        return ({ courses: courses });
      });
    },
  };
}
