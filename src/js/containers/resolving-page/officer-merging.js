import { compose } from 'redux';
import { connect } from 'react-redux';

import { fetchUnmergeable, deleteUnmergeable } from 'actions/resolving-page/index';
import OfficerMerging from 'components/resolving-page/officer-merging';
import withPagination from './with-pagination';

function mapStateToProps(state, ownProps) {
  return {
  };
}

const mapDispatchToProps = {
  deleteUnmergeable
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPagination(fetchUnmergeable, 'resolvingPage.unmergeable')
)(OfficerMerging);
