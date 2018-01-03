import React from 'react';
import { compose } from 'recompose';
import { parseString } from 'xml2js';

import CourseCard from './CourseCard';
import LoadScreenWhileLoading from './LoadScreenWhileLoading';

import { Grid, Row, Col } from 'react-flexbox-grid';

import styles from './CardsView.css';

const enhance =
  compose(
    LoadScreenWhileLoading,
  );

const CardsView = enhance(({
  courses,
  coursesXSLT,
}) => {
  return (
    <div className={ styles.cardsview }>
      <Grid className={ styles.grid } fluid >
        <Row className={ styles.row } around="xs" >
          { courses.map((course, index) => {
            return (
              <Col key={ index } className={ styles.col }>
                <CourseCard
                  course={ course }
                  coursesXSLT={ coursesXSLT }
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
