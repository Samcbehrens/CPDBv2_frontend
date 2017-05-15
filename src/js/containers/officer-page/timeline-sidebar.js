import { connect } from 'react-redux';

import TimelineSideBar from 'components/officer-page/timeline-page/sidebar';
import { fetchMinimap, flipSortOrder, selectMinimapItem, hoverMinimapItem } from 'actions/officer-page/timeline';
import { getSortDescending, minimapSelector, getHoveredItemIndex } from 'selectors/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    sortDescending: getSortDescending(state),
    minimap: minimapSelector(state),
    hoveredItemIndex: getHoveredItemIndex(state)
  };
}

const mapDispatchToProps = {
  fetchMinimap,
  flipSortOrder,
  selectMinimapItem,
  hoverMinimapItem
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineSideBar);

