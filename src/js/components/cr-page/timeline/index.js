import React, { Component, PropTypes } from 'react';

import { wrapperStyle, titleStyle } from './timeline.style';
import IncidentAndBeginAndClose from './incident-begin-close-svg';
import IncidentBeginClose from './incidentbeginclose-svg';
import IncidentBeginAndClose from './incidentbegin-close-svg';
import IncidentAndBeginClose from './incident-beginclose-svg';


export default class Timeline extends Component {
  renderTimeline() {
    const { startDate, endDate, incidentDate } = this.props;
    if (startDate === endDate && endDate === incidentDate && startDate) {
      return <IncidentBeginClose incidentDate={ incidentDate }/>;
    } else if (incidentDate === startDate && incidentDate) {
      return <IncidentBeginAndClose endDate={ endDate } incidentDate={ incidentDate } />;
    } else if (startDate === endDate && startDate) {
      return <IncidentAndBeginClose startDate={ startDate } incidentDate={ incidentDate } />;
    }
    return <IncidentAndBeginAndClose startDate={ startDate } endDate={ endDate } incidentDate={ incidentDate } />;
  }

  render() {
    return (
      <div style={ wrapperStyle }>
        <div style={ titleStyle }>INVESTIGATION TIMELINE</div>
        { this.renderTimeline() }
      </div>
    );
  }
}

Timeline.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string
};
