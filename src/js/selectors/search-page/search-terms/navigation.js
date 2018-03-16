import { createSelector } from 'reselect';
import { concat, flatten, map } from 'lodash';

import { navigationItemTransform } from './transforms';
import * as constants from 'utils/constants';
import { categoriesSelector } from './categories';


const getSearchTermsNavigationIndex = state => state.searchPage.searchTerms.navigation.itemIndex;
export const getScrollTo = state => state.searchPage.searchTerms.navigation.scrollTo;

const flattenItems = createSelector(
  categoriesSelector,
  categories => {
    return concat(
      [{ uniqueKey: constants.SEARCH_BOX }],
      flatten(categories.map(category => {
        const items = map(category.items, item => ({ ...item, type: category.name }));
        return [
          { id: category.name, name: category.name, type: 'category' },
          ...items,
        ];
      })));
  }
);

const rawFocusedItemSelector = createSelector(
  flattenItems,
  getSearchTermsNavigationIndex,
  (itemsList, itemIndex) => {
    if (itemsList[itemIndex] !== undefined) {
      return itemsList[itemIndex];
    }
    return itemsList[0];
  }
);

export const totalItemCountSelector = createSelector(
  flattenItems,
  (itemsList) => itemsList.length
);

export const focusedSearchTermItemSelector = createSelector(
  rawFocusedItemSelector,
  navigationItemTransform
);

export const navigationKeySelector = createSelector(
  flattenItems,
  (items) => {
    const navigationItems = items.map(navigationItemTransform);
    return navigationItems.map((navigationItem) => navigationItem.uniqueKey);
  }
);