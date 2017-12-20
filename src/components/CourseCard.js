import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import Card, { CardHeader, CardMedia, CardContent, CardActions, } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { withStyles } from 'material-ui/styles';

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
  },
  body1: {
    whiteSpace: 'normal',
    fontFamily: 'Barlow',
  },

  title: {
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    fontSize: 20,
  },
  avatar: {
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    fontSize: 15,
    width: 60,
    height: 60,
    backgroundColor: '#263252',
  },
  content: {
    display: 'flex',
  },
};

const CourseCard = enhance(({
  course,
  classes,
}) => {
  return (
    <Card classes={ {root: classes.root} }>
      <CardHeader
        classes={ {title: classes.title } }
        avatar={ <Avatar classes={ {root: classes.avatar} } >{course.code}</Avatar> }
        title={ course.title }
      />
      <CardContent classes={ {root: classes.content} } >
        <Typography
          classes={ {body1: classes.body1} }
          paragraph
          gutterBottom={ true }
          noWrap={ true }
          dangerouslySetInnerHTML={ {__html: course.description } }
        />
        <Typography classes={ {body1: classes.body1} } >
          9.4/10
        </Typography>
      </CardContent>
    </Card>
  );
});

export default withStyles(styles)(CourseCard);
