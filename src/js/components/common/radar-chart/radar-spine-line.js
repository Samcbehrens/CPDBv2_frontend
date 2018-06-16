import React, { PropTypes } from 'react';

import { axisSpineLineStyle } from './radar-spine-line.style';


export default class RadarSpineLine extends React.Component {
  render() {
    const { rPoints, showSpineLinePoint } = this.props;

    return (
      <g className='test--radar-spine-line'>
        { rPoints.map((point, i) => (typeof point.x !== 'undefined') && (
          <line
            key={ `line-${i}` }
            x1={ 0 } y1={ 0 }
            x2={ point.x }
            y2={ point.y }
            style={ axisSpineLineStyle }
          />
        )) }
        { rPoints.map((point, i) => (typeof point.x !== 'undefined' && showSpineLinePoint) && (
          <circle
            key={ `circle-${i}` }
            cx={ point.x }
            cy={ point.y }
            r={ 3 }
            strokeWidth={ 1 }
            stroke='white'/>
        )) }
      </g>
    );
  }
}

RadarSpineLine.propTypes = {
  rPoints: PropTypes.array.isRequired,
  showSpineLinePoint: PropTypes.bool,
};

RadarSpineLine.defaultProps = {
  showSpineLinePoint: false,
};
