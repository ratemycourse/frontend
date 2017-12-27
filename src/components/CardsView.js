import React from 'react';
import { compose } from 'recompose';

import CourseCard from './CourseCard';
import LoadScreenWhileLoading from './LoadScreenWhileLoading';
import CoursesXMLsplit from '../helperFunctions/CoursesXMLsplit';

import { Grid, Row, Col } from 'react-flexbox-grid';

import styles from './CardsView.css';

const enhance =
  compose(
    LoadScreenWhileLoading,
  );

const CardsView = enhance(({
  coursesxml,
  xsltfile,
}) => {
  const courses = CoursesXMLsplit(coursesxml, 'course');
  return (    
    <div className={ styles.cardsview }>
      <Grid className={ styles.grid } fluid >
        <Row className={ styles.row } around="xs" >
          { courses.map((course) => {
            return (
              <Col className={ styles.col }>
                <CourseCard
                  course={ course }
                  xsltfile={ xsltfile }
                />
              </Col>
            );
          })}
        </Row>
      </Grid>
    </div>
  );
});

export default CardsView;
