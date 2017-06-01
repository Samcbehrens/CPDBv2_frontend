import { get, put, post, destroy } from 'actions/common/async-action';

import {
  RESOLVING_MATCHING_URL,
  UNMATCHABLE_START, UNMATCHABLE_SUCCESS, UNMATCHABLE_FAILURE,
  MATCHING_API_START, MATCHING_API_SUCCESS, MATCHING_API_FAILURE,
  UNMERGEABLE_URL, UNMERGEABLE_START, UNMERGEABLE_SUCCESS, UNMERGEABLE_FAILURE,
  UNMERGEABLE_DELETE_START, UNMERGEABLE_DELETE_SUCCESS, UNMERGEABLE_DELETE_FAILURE,
  TRAINING_DATA_URL,
  FETCH_TRAINING_DATA_START, FETCH_TRAINING_DATA_SUCCESS, FETCH_TRAINING_DATA_FAILURE,
  TRAINING_DATA_START, TRAINING_DATA_SUCCESS, TRAINING_DATA_FAILURE
} from 'utils/constants';


export const fetchUnmatchable = (url = `${RESOLVING_MATCHING_URL}?limit=1&offset=0`) => (get(
  url,
  [UNMATCHABLE_START, UNMATCHABLE_SUCCESS, UNMATCHABLE_FAILURE]
)());

export const fetchUnmergeable = (url = `${UNMERGEABLE_URL}?limit=1&offset=0`) => {
  return get(
    url,
    [UNMERGEABLE_START, UNMERGEABLE_SUCCESS, UNMERGEABLE_FAILURE]
  )();
};

export const matchingAPI = (unmatchableId, candidateId) => (put(
  `${RESOLVING_MATCHING_URL}${unmatchableId}/`,
  [MATCHING_API_START, MATCHING_API_SUCCESS, MATCHING_API_FAILURE]
)({ 'candidate_pk': candidateId }));

export const deleteUnmergeable = (unmergeableId, updatedRecord) => (destroy(
  `${UNMERGEABLE_URL}${unmergeableId}/`,
    [UNMERGEABLE_DELETE_START, UNMERGEABLE_DELETE_SUCCESS, UNMERGEABLE_DELETE_FAILURE]
)({ 'record': updatedRecord }));


export const fetchTrainingData = () => (get(
  TRAINING_DATA_URL,
  [FETCH_TRAINING_DATA_START, FETCH_TRAINING_DATA_SUCCESS, FETCH_TRAINING_DATA_FAILURE]
))();

export const train = (action, self, other) => (post(
  TRAINING_DATA_URL,
  [TRAINING_DATA_START, TRAINING_DATA_SUCCESS, TRAINING_DATA_FAILURE]
))({
  'this': self,
  'other': other,
  'action': action
});
