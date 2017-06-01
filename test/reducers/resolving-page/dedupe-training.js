import dedupeTraining from 'reducers/resolving-page/dedupe-training';

import { FETCH_TRAINING_DATA_SUCCESS } from 'utils/constants';


describe('dedupeTrainingReducer', function () {
  it('should have initial state', function () {
    dedupeTraining(undefined, {}).should.eql({});
  });

  it('should handle UNMATCHABLE_SUCCESS', function () {
    dedupeTraining(undefined, {
      type: FETCH_TRAINING_DATA_SUCCESS,
      payload: { 'a': 'b' }
    }).should.eql({ 'a': 'b' });
  });
});
