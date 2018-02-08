import { handleActions } from 'redux-actions';
import {
  SEARCH_TERMS_NAVIGATION_UP,
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERMS_NAVIGATION_RESET,
} from 'utils/constants';


export default handleActions({
  [SEARCH_TERMS_NAVIGATION_RESET]: () => ({ itemIndex: 1 }),

  [SEARCH_TERMS_NAVIGATION_DOWN]: ({ itemIndex }, action) => {
    const { totalItemCount } = action.payload;
    const newItemIndex = itemIndex < totalItemCount - 1 ? itemIndex + 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  },

  [SEARCH_TERMS_NAVIGATION_UP]: ({ itemIndex }, action) => {
    const newItemIndex = itemIndex > 0 ? itemIndex - 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  }
}, {
  'itemIndex': 0
});