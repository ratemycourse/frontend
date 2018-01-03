import React from 'react';
import { compose, withHandlers } from 'recompose';
import LoadScreenWhileLoading from './LoadScreenWhileLoading';
import Chip from 'material-ui/Chip';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { withStyles } from 'material-ui/styles'; 
import styles from './FilterBar.css';


const style = {
  root: {
    whiteSpace: 'normal',
    fontFamily: 'Barlow', 
  },
};

const enhance = compose(
  LoadScreenWhileLoading,
  withHandlers({
    onClick: (props) => (e) => {
      props.onClick(e);
    },
  })
  );

const FilterBar = enhance(({
  departments,
  filter,
  onClick,
  headerText,
  classes,
  expanded,
}) => {
  return (
    <div>
      <ExpansionPanel defaultExpanded={ expanded  }> 
        <ExpansionPanelSummary classes={ {root: classes.root} } expandIcon={ <ExpandMoreIcon /> }>
          { headerText }
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={ styles.filterbar }>
            { departments.map((department) => {
              if (filter.includes(department.code)) {
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );  
});

export default withStyles(style)(FilterBar);
