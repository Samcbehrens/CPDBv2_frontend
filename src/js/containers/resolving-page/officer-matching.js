import { connect } from 'react-redux';

import { fetchUnmatchable, matchingAPI } from 'actions/resolving-page/index';
import {
  countSelector, officerMatchingSelector, nextUrlSelector, prevUrlSelector, offsetSelector
} from 'selectors/resolving-page';
import OfficerMatching from 'components/resolving-page/officer-matching';


function mapStateToProps(state, ownProps) {
  return {
    count: countSelector(state),
    nextUrl: nextUrlSelector(state),
    prevUrl: prevUrlSelector(state),
    offset: offsetSelector(state),
    ...officerMatchingSelector(state, ownProps)
  };
}

const mapDispatchToProps = {
  fetchUnmatchable,
  matchingAPI
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerMatching);
