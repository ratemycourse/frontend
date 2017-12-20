import React from 'react';
import { compose, withHandlers } from 'recompose';

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
}) => {
  return (
    <div className={ styles.cardsview }>
      <Grid className={ styles.grid } fluid >
        <Row className={ styles.row } around="xs" >
          { Object.keys(courses).map((course) => {
            return (
              <Col className={ styles.col }key={ courses[course].code }>
                <CourseCard
                  course={ courses[course] }
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
