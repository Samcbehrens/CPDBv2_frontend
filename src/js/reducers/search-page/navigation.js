import { handleActions } from 'redux-actions';
import {
  SEARCH_NAVIGATION_DOWN, SEARCH_NAVIGATION_UP, SEARCH_NAVIGATION_RESET
} from 'actions/search-page';


export default handleActions({
  [SEARCH_NAVIGATION_RESET]: () => ({ itemIndex: 0 }),

  [SEARCH_NAVIGATION_DOWN]: ({ itemIndex }, action) => {
    const { totalItemCount } = action.payload;
    const newItemIndex = itemIndex < totalItemCount - 1 ? itemIndex + 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  },

  [SEARCH_NAVIGATION_UP]: ({ itemIndex }, action) => {
    const newItemIndex = itemIndex > 0 ? itemIndex - 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  }
}, {
  'itemIndex': 0
});
