import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';

import { menuItemStyle, menuStyle, tabbedPaneSectionStyle } from './tabbed-pane-section.style';
import TimelineContainer from 'containers/officer-page/timeline-container';
import CoaccusalsContainer from 'containers/officer-page/coaccusals-container';
import AttachmentsContainer from 'containers/officer-page/attachments-container';
import { OFFICER_PAGE_TAB_NAMES } from 'utils/constants';
import MapContainer from 'containers/officer-page/map-container';


export default class TabbedPaneSection extends Component {
  constructor(props) {
    super(props);
    this.tabbedPaneMap = {
      [OFFICER_PAGE_TAB_NAMES.TIMELINE]: <TimelineContainer/>,
      [OFFICER_PAGE_TAB_NAMES.MAP]: <MapContainer/>,
      [OFFICER_PAGE_TAB_NAMES.COACCUSALS]: <CoaccusalsContainer/>,
      [OFFICER_PAGE_TAB_NAMES.ATTACHMENTS]: <AttachmentsContainer/>,
    };
  }

  render() {
    const { currentTab, changeOfficerTab } = this.props;
    return (
      <div style={ tabbedPaneSectionStyle } className='tabbed-pane-section'>
        <div style={ menuStyle } className='test--tabbed-pane-section-menu'>
          {
            keys(this.tabbedPaneMap).map((paneName) => (
              <span
                key={ paneName }
                style={ menuItemStyle(paneName === currentTab) }
                className='test--tabbed-pane-tab-name'
                onClick={ () => changeOfficerTab(paneName) }
              >
                { paneName }
              </span>)
            )
          }
        </div>
        { get(this.tabbedPaneMap, currentTab, null) }
      </div>
    );
  }
}

TabbedPaneSection.propTypes = {
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
};
