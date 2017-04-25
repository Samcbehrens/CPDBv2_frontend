import { get, patch } from 'actions/common/async-action';

import {
  RESOLVING_MATCHING_URL,
  RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE,
  MATCHING_API_START, MATCHING_API_SUCCESS, MATCHING_API_FAILURE
} from 'utils/constants';


export const fetchUnmatchable = (url=`${RESOLVING_MATCHING_URL}?limit=1&offset=0`) => (get(
  url,
  [RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE]
)());

export const matchingAPI = (unmatchableId, candidateId) => (patch(
  `${RESOLVING_MATCHING_URL}${unmatchableId}/`,
  [MATCHING_API_START, MATCHING_API_SUCCESS, MATCHING_API_FAILURE]
)({ 'candidate_pk': candidateId }));
