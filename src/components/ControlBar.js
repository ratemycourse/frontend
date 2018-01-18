import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import TiRefresh from 'react-icons/lib/ti/refresh';
import TiRefreshOutline from 'react-icons/lib/ti/refresh-outline';
import TiArrowLeftThick from 'react-icons/lib/ti/arrow-left-thick';
import TiArrowLeftOutline from 'react-icons/lib/ti/arrow-left-outline';
import TiArrowRightThick from 'react-icons/lib/ti/arrow-right-thick';
import TiArrowRightOutline from 'react-icons/lib/ti/arrow-right-outline'
import TiHome from 'react-icons/lib/ti/home';
import TiHomeOutline from 'react-icons/lib/ti/home-outline'
import colors from '../scss/_palette.scss';

const enhance = compose(
  withState('buttons', 'setButtons', [false, false, false, false]),
  withHandlers({
    onRefreshClick: (props) => () => { props.onSubmit() },
    onBackClick: (props) => () => { props.onBackClick() },
    onForwardClick: (props) => () => { props.onForwardClick() },
    onHomeClick: (props) => () => { props.onHomeClick() },
    onEnter: ({ setButtons, buttons }) => (e) => { setButtons([...Array(e).fill(false), true, ...Array(buttons.length - (e + 1)).fill(false)]) },
    onLeave: ({ setButtons, buttons }) => () => { setButtons([...Array(buttons.length).fill(false)]) },
  }),
);

const ControlBar = enhance(({
  onRefreshClick,
  onBackClick,
  onForwardClick,
  onHomeClick,
  onEnter,
  onLeave,
  size,
  buttons,
}) => {
  return (
    <div className="d-flex p-2 m-0 bg-primary align-items-center justify-content-end" >
      <div className="btn-group" role="group">
        <div
          className="btn btn-outline-tetriary" onClick={ onBackClick }
          onMouseEnter={ () => onEnter(0) } onMouseLeave={ () => onLeave(0) }
        >
          { buttons[0] 
          ? <TiArrowLeftThick
            style={ {marginTop: '-10px', marginBottom: '-7px'} }
            height={ size }
            width={ size }
            fill="white"
            />
          : <TiArrowLeftOutline
            style={ {marginTop: '-10px', marginBottom: '-7px'} }
            height={ size }
            width={ size }
            fill={ colors.tetriaryColor }
            /> }
        </div>
        <div
          className="btn btn-outline-tetriary" onClick={ onHomeClick }
          onMouseEnter={ () => onEnter(1) } onMouseLeave={ () => onLeave(1) }
        >
          { buttons[1] 
          ? <TiHome
            style={ {marginTop: '-10px', marginBottom: '-7px'} }
            height={ size }
            width={ size }
            fill="white"
            />
          : <TiHomeOutline
            style={ {marginTop: '-10px', marginBottom: '-7px'} }
            height={ size }
            width={ size }
            fill={ colors.tetriaryColor }
            /> }
        </div>
        <div
          className="btn btn-outline-tetriary" onClick={ onForwardClick }
          onMouseEnter={ () => onEnter(2) } onMouseLeave={ () => onLeave(2) }
        >
          { buttons[2]
          ? <TiArrowRightThick
            style={ {marginTop: '-10px', marginBottom: '-7px'} }
            height={ size } 
            width={ size }
            fill="white"
            />
          : <TiArrowRightOutline
            style={ {marginTop: '-10px', marginBottom: '-7px'} }
            height={ size }
            width={ size }
            fill={ colors.tetriaryColor }
            /> }
        </div>
        <div
          className="btn btn-outline-tetriary" onClick={ onRefreshClick }
          onMouseEnter={ () => onEnter(3) } onMouseLeave={ () => onLeave(3) }
        >
          { buttons[3]
          ? <TiRefresh
            style={ {marginTop: '-10px', marginBottom: '-7px'} }

            height={ size * 1.2 } 
            width={ size * 1.2 }
            fill="white"
            />
          : <TiRefreshOutline
            style={ {marginTop: '-10px', marginBottom: '-7px'} }
            height={ size * 1.2 } 
            width={ size * 1.2 }
            fill={ colors.tetriaryColor }
            /> }
        </div>
      </div>
    </div>
  );
});

export default ControlBar;
