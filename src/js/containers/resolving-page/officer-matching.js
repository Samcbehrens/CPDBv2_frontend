import { compose } from 'redux';
import { connect } from 'react-redux';

import { fetchUnmatchable, matchingAPI } from 'actions/resolving-page/index';
import OfficerMatching from 'components/resolving-page/officer-matching';
import withPagination from './with-pagination';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = {
  matchingAPI
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPagination(fetchUnmatchable, 'resolvingPage.unmatchable')
)(OfficerMatching);
