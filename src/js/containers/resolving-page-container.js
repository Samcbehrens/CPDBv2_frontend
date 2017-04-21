import { connect } from 'react-redux';
import React from 'react';

import ResolvingPage from 'components/resolving-page';
import { fetchUnmatchable } from 'actions/resolving-page';


function mapStateToProps(state, ownProps) {
  return {
    unmatchable: state.unmatchable
  };
}

const mapDispatchToProps = {
  fetchUnmatchable
};

export default connect(mapStateToProps, mapDispatchToProps)(ResolvingPage);
