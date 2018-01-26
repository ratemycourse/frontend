import { lifecycle } from 'recompose';

const applyEventHandler = (eventHandler) => {
  for (const element of document.getElementsByClassName('courseCard')) {
    element.addEventListener('click', () => eventHandler(element.getAttribute('code')));
  }
};

const ApplyCourseRoute = lifecycle({
  componentDidMount() {
    applyEventHandler(this.props.goToCoursePageHandler);
  },
});

export default ApplyCourseRoute;
