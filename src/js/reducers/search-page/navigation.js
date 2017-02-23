import { handleActions } from 'redux-actions';
import { SEARCH_NAVIGATION_LEFT,
         SEARCH_NAVIGATION_DOWN,
         SEARCH_NAVIGATION_RIGHT,
         SEARCH_NAVIGATION_UP } from 'actions/search-page';


export default handleActions({
  [SEARCH_NAVIGATION_LEFT]: (state, action) => {
    const { suggestionColumns } = action.payload;

    if (state[0] > 0) {
      const currentColumnSize = suggestionColumns[state[0] - 1];

      if (state[1] < currentColumnSize - 1) {
        return [state[0] - 1, state[1]];
      }
      else {
        return [state[0] - 1, currentColumnSize - 1];
      }
    } else {
      return [state[0], state[1]];
    }
  },

  [SEARCH_NAVIGATION_DOWN]: (state, action) => {
    const { suggestionColumns } = action.payload;
    const currentColumnSize = suggestionColumns[state[0]];

    if (state[1] < currentColumnSize - 1) {
      return [state[0], state[1] + 1];
    } else {
      return [state[0], state[1]];
    }
  },

  [SEARCH_NAVIGATION_UP]: (state, action) => {
    if (state[1] > 0) {
      return [state[0], state[1] - 1];
    } else {
      return [state[0], 0];
    }
  },

  [SEARCH_NAVIGATION_RIGHT]: (state, action) => {
    const { suggestionColumns } = action.payload;
    const numberOfColumns = suggestionColumns.length;

    if (state[0] < numberOfColumns - 1) {
      const currentColumnSize = suggestionColumns[state[0] + 1];

      if (state[1] < currentColumnSize - 1) {
        return [state[0] + 1, state[1]];
      }
      else {
        return [state[0] + 1, currentColumnSize - 1];
      }
    } else {
      return [state[0], state[1]];
    }
  }
}, [0, 0]);
