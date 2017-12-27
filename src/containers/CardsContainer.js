import React from 'react';
import CardsView from '../components/CardsView';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import * as actionCreators from '../store/Actions';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      this.props.dispatch(actionCreators.GetCourses('dm'));
      this.props.dispatch(actionCreators.GetStatic('courselist.xsl'));
    },
  })
);

const CardsContainer = enhance(({
  courses,
  loading,
  staticfile,
}) => {
  return (
    <div>
      <CardsView
        coursesxml={ courses }
        xsltfile={ staticfile }
        loading={ loading }
      />
    </div>
  );
});

function mapStateToProps(state) {
  return {
    loading: state.default.data.loading,
    courses: state.default.data.courses,
    staticfile: state.default.data.staticfile,
    cardsByID: state.default.cards.cardsByID,
  };
}

export default connect(mapStateToProps)(CardsContainer);
