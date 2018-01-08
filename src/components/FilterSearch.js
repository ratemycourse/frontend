import React from 'react';
import { compose, withHandlers } from 'recompose';

import LoadScreenWhileLoading from './LoadScreenWhileLoading';
import Chip from 'material-ui/Chip';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import InputBox from './InputBox';

import { withStyles } from 'material-ui/styles';
import styles from './FilterBar.css';


const style = {
  root1: {
    whiteSpace: 'normal',
    fontFamily: 'Barlow',
  },
  root2: {
    position: '',
    width: '97.5%',
  },
};

const enhance = compose(
  LoadScreenWhileLoading,
  withHandlers({
    onClick: (props) => (e) => {
      props.onClick(e);
    },
    onSubmit: (props) => (e) => {
      props.onSubmit(e);
    },
  })
);

const FilterBar = enhance(({
  departments,
  filter,
  visible,
  onClick,
  onSubmit,
  headerText,
  classes,
  expanded,
}) => {
  return (
    <div>
      <ExpansionPanel defaultExpanded={ expanded }>
        <ExpansionPanelSummary classes={ {root: classes.root1} } expandIcon={ <ExpandMoreIcon /> }>
          { headerText }
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={ {root: classes.root2} }>
          <div className={ styles.tagcontainer }>
            <div className={ styles.inputbox }>
              <InputBox
                placeholder="Search department..."
                handleSubmit={ onSubmit }
                id="departmentSearch"
                type="text"
              />
            </div>
            <div className={ styles.filterbar }>
              { departments.map((department) => {
                if (filter.includes(department.code) && visible.includes(department.code)) {
                  return (
                    <div key={ department.code } className={ styles.chip }>
                      <Chip
                        label={ department.name }
                        onClick={ onClick.bind(this, department.code) }
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
});

export default withStyles(style)(FilterBar);
