import React, { PropTypes } from 'react';

import { radarAxisTextStyle, radarAxisTitleStyle, radarBoundaryAreaStyle } from './radar-axis.style';
import { scaleLinear } from 'd3-scale';
import { curveLinearClosed, radialLine } from 'd3-shape';

export default class RadarAxis extends React.Component {
  render() {
    const { radius, axisTitles, maxValue } = this.props;

    if (!axisTitles)
      return <g className='test--radar--axis-wrapper'/>;
    const angleSlice = Math.PI * 2 / axisTitles.length;
    const labelFactor = 1.15; // How much farther than radius of outer circle should labels be placed

    const rScale = scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(rScale(maxValue))
      .angle((d, i) => i * angleSlice - Math.PI);

    return (
      <g className='test--radar--axis-wrapper'>

        { axisTitles.map((title, i) => {
          const xText = radius * labelFactor * Math.cos(angleSlice * i + Math.PI / 2);
          const yText = radius * labelFactor * Math.sin(angleSlice * i + Math.PI / 2);

          return (
            <g key={ `axis--${i}` } className='test--radar--axis--axis'>
              <text
                className='legend' textAnchor='middle' dy='0.35em'
                x={ xText } y={ yText } style={ radarAxisTextStyle }>
                <tspan style={ radarAxisTitleStyle } x={ xText } y={ yText } dy='0.35em'>{ title }</tspan>
              </text>
            </g>
          );
        })
        }

        <path
          className='test--radar--boundary-area'
          d={ radarLine(axisTitles.map(() => ({ value: maxValue }))) }
          style={ radarBoundaryAreaStyle }/>
      </g>
    );
  }
}

RadarAxis.propTypes = {
  radius: PropTypes.number,
  maxValue: PropTypes.number,
  axisTitles: PropTypes.array
};
