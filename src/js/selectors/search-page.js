import { createSelector } from 'reselect';
import { omitBy, isEmpty, keys, pick, indexOf, sortBy, chunk, flatten } from 'lodash';

const SEARCH_CATEGORIES = ['OFFICER', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT', 'UNIT > OFFICERS', 'CR'];

const getSuggestionGroups = (state) => (state.searchPage.suggestionGroups);
const getSuggestionTags = (state) => (state.searchPage.tags);
const getSuggestionNavigation = state => state.searchPage.navigation;
const getSuggestionContentType = state => state.searchPage.contentType;
const getNumberOfItemsPerColumn = state => state.searchPage.itemsPerColumn;

export const previewPaneInfoSelector = createSelector(
  suggestion => suggestion,
  (suggestion) => {
    const { payload, id, text } = suggestion;
    const currentYear = (new Date()).getFullYear();
    const data = [
      ['unit', payload.unit],
      ['rank', payload.rank],
      [`${currentYear} salary`, payload.salary],
      ['race', payload.race],
      ['sex', payload.sex]
    ];
    const visualTokenBackgroundColor = payload['visual_token_background_color'];
    return { data, visualTokenBackgroundColor, id, text };
  }
);


export const suggestionGroupsSelector = createSelector(
  getSuggestionGroups,
  (suggestionGroups) => (
    pick(omitBy(suggestionGroups, isEmpty), SEARCH_CATEGORIES)
  )
);

/*
  [
    {
      header: 'OFFICER',
      items: [<officer1>, <officer2>]
    },
    {
      header: 'COMMUNITY',
      items: [<co1>, <co2>]
    }
  ]
*/
export const orderedSuggestionGroupsSelector = createSelector(
  suggestionGroupsSelector,
  unorderedSuggestionGroups => {
    const orderedKeys = keys(unorderedSuggestionGroups);
    return orderedKeys.map(key => ({ header: key, items: unorderedSuggestionGroups[key] }));
  }
);

export const isShowingSingleContentTypeSelector = createSelector(
  getSuggestionContentType,
  contentType => !!contentType
);

/*
[
  {
    header: 'OFFICER',
    columns: [
      [1, 2],
      [3, 4]
    ],
    canLoadMore: <boolean>
  },
  {
    header: 'COMMUNITY',
    columns: [
      [1, 2],
      [3, 4]
    ],
    canLoadMore: <boolean>
  }
]
*/
export const chunkedSuggestionGroupsSelector = createSelector(
  orderedSuggestionGroupsSelector,
  getNumberOfItemsPerColumn,
  isShowingSingleContentTypeSelector,
  (orderedGroups, itemsPerColumn, isSingle) => {
    if (!orderedGroups || orderedGroups.length === 0) {
      return [];
    }

    if (isSingle) {
      const group = orderedGroups[0];
      return [{
        header: group.header,
        columns: chunk(group.items, itemsPerColumn),
        canLoadMore: false
      }];

    } else {
      return orderedGroups.map((group, index) => {
        const slicedGroup = group.items.slice(0, itemsPerColumn);
        return {
          header: group.header,
          columns: [slicedGroup],
          canLoadMore: slicedGroup.length >= itemsPerColumn
        };
      });
    }
  }
);

export const coordinatesMapSelector = createSelector(
  chunkedSuggestionGroupsSelector,
  chunkedGroups => {
    const coordinatesMap = flatten(chunkedGroups.map(group => group.columns));
    const headers = chunkedGroups.map(group => group.header);
    return { coordinatesMap, headers };
  }
);

export const focusedSuggestionSelector = createSelector(
  coordinatesMapSelector,
  getSuggestionNavigation,
  ({ coordinatesMap, headers }, { columnIndex, itemIndex }) => {
    const column = coordinatesMap[columnIndex];
    if (column) {
      const header = headers.length === 1 ? headers[0] : headers[columnIndex];
      return { ...column[itemIndex], header };
    }
    return {};
  }
);

export const suggestionTagsSelector = createSelector(
  getSuggestionTags,
  (suggestionTags) => (
    sortBy(suggestionTags, (tag) => (indexOf(SEARCH_CATEGORIES, tag))
    )
  ));

export const isEmptySelector = createSelector(
  suggestionGroupsSelector,
  (suggestionGroups) => (
    !keys(suggestionGroups).length
  )
);

export const suggestionColumnsSelector = createSelector(
  coordinatesMapSelector,
  ({ coordinatesMap, headers }) => coordinatesMap.map(column => column.length)
);
