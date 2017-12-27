import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import xslt from 'xslt';

const enhance = compose(
  withState('cardOpen', 'setCardOpen', false),
  withState('cardPrevHeight', 'setCardPrevHeight', null),
  withHandlers({
    onCardClick: (props) => () => {
      props.onClick(props);
    },
  })
);

const styles = {
  root: {
    padding: '1px',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  body1: {
    whiteSpace: 'normal',
    fontFamily: 'Barlow',
    padding: '20px',
    maxWidth: '500px',
    height: '200px',
  },
};

const CourseCard = enhance(({
  course,
  xsltfile,
  classes,
}) => {
  const transformedXML = xslt(course, xsltfile);
  return (
    <Paper classes={ {root: classes.root} }>
      <Typography
        classes={ {body1: classes.body1} }
        paragraph
        noWrap={ true }
        dangerouslySetInnerHTML={ {__html: transformedXML } }
      />
    </Paper>
  );
});

export default withStyles(styles)(CourseCard);
