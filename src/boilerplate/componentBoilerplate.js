import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
  // HOCs
  withHandlers({
    // Handlers
  }),
);

const Component = enhance(({
  //PassProps
}) => {
return (
  //JSX and call to other components
  );
});

const mapStateToProps = (state) => {
  return {
    };
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
