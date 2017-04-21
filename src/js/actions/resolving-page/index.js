import { get } from 'actions/common/async-action';

import {
  RESOLVING_MATCHING_URL, RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE
} from 'utils/constants';


export const fetchUnmatchable = () => (get(
  `${RESOLVING_MATCHING_URL}$`,
  [RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE]
)());
