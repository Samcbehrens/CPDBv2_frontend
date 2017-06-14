import React, { Component, PropTypes } from 'react';

import ViewMapButton from './view-map-button';
import CRLocationMap from './cr-location-map';
import {
  wrapperStyle, locationTextStyle, addressStyle, locationStyle, beatStyle, labelStyle, contentStyle
} from './location.style';


export default class Location extends Component {
  render() {
    const { point, address, location, beat } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ locationTextStyle }>LOCATION</div>
        {
          point ? <CRLocationMap lng={ point.long } lat={ point.lat }/> : null
        }
        <div style={ addressStyle }>
          <span style={ labelStyle }>Address</span>
          <span style={ contentStyle }>{ address }</span>
          {
            point ? <ViewMapButton lng={ point.long } lat={ point.lat }/> : null
          }
        </div>
        <div style={ locationStyle }>
          <span style={ labelStyle }>Location</span>
          <span style={ contentStyle }>{ location }</span>
        </div>
        <div style={ beatStyle }>
          <span style={ labelStyle }>Beat</span>
          <span style={ contentStyle }>{ beat.name }</span>
        </div>
      </div>
    );
  }
}

Location.propTypes = {
  point: PropTypes.object,
  address: PropTypes.string,
  location: PropTypes.string,
  beat: PropTypes.object
};

Location.defaultProps = {
  beat: { name: 'Unknown' }
};