import { connect } from 'react-redux';

import { fetchTrainingData, train } from 'actions/resolving-page/index';
import DedupeTraining from 'components/resolving-page/dedupe-training';


function mapStateToProps(state, ownProps) {
  return {
    records: state.resolvingPage.dedupeTraining
  };
}

const mapDispatchToProps = {
  fetchTrainingData,
  train
};

export default connect(mapStateToProps, mapDispatchToProps)(DedupeTraining);
