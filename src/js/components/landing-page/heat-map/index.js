import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import SummaryPanel from './summary-panel';
import CommunityMap from './community-map';
import { wrapperStyle, minimumStyle, mediumStyle, maximumStyle } from './heat-map.style';
import * as GATracking from 'utils/google_analytics_tracking';


export default class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0
    };
    this.setSelectedCommunity = this.setSelectedCommunity.bind(this);
  }

  setSelectedCommunity(id) {
    const { communities } = this.props;
    const community = find(communities, obj => obj.id === id);
    community && GATracking.trackCommunityClick(community.name);

    this.setState({
      selectedId: id
    });
  }

  render() {
    const { selectedId } = this.state;
    const { communities, communityGeoJSON, clusterGeoJson } = this.props;

    return (
      <div style={ wrapperStyle }>
        <CommunityMap
          communitySource={ communityGeoJSON }
          selectCommunity={ this.setSelectedCommunity }
          communityId={ selectedId }
          clusterSource={ clusterGeoJson }
        />
        <ResponsiveFluidWidthComponent
          minimumStyle={ minimumStyle }
          mediumStyle={ mediumStyle }
          maximumStyle={ maximumStyle }
          minWidthThreshold={ 768 }
          maxWidthThreshold={ 1024 }
        >
          <SummaryPanel
            communities={ communities }
            communityId={ selectedId }
            selectCommunity={ this.setSelectedCommunity }
          />
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

HeatMap.propTypes = {
  communities: PropTypes.array,
  communityGeoJSON: PropTypes.object,
  clusterGeoJson: PropTypes.object
};
