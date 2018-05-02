import { connect } from 'react-redux';

import SearchResults from 'components/search-page/search-results';
import {
  getSuggestion,
  trackRecentSuggestion,
  resetNavigation,
  getSuggestionWithContentType,
  move,
  setSearchNavigation,
} from 'actions/search-page';
import { setAliasAdminPageContent } from 'actions/inline-alias-admin-page';
import {
  isEmptySelector,
  searchResultGroupsSelector,
  hasMoreSelector,
  nextParamsSelector,
  isShowingSingleContentTypeSelector
} from 'selectors/search-page/search-results/suggestion-groups';
import {
  previewPaneInfoSelector,
} from 'selectors/search-page/search-results/navigation';
import { getFocusedItem } from 'selectors/search-page';
import { navigationKeySelector } from '../../selectors/search-page/search-results/navigation';


function mapStateToProps(state, ownProps) {
  const { onLoadMore, aliasEditModeOn, editModeOn } = ownProps;
  const { isRequesting, query, contentType } = state.searchPage;

  return {
    onLoadMore,
    aliasEditModeOn,
    isEmpty: isEmptySelector(state),
    searchText: query,
    contentType,
    editModeOn,
    suggestionGroups: searchResultGroupsSelector(state),
    isRequesting,
    previewPaneInfo: previewPaneInfoSelector(state),
    focusedItem: getFocusedItem(state),
    hasMore: hasMoreSelector(state),
    nextParams: nextParamsSelector(state),
    singleContent: isShowingSingleContentTypeSelector(state),
    navigationKeys: navigationKeySelector(state),
  };
}

const mapDispatchToProps = {
  getSuggestion,
  resetNavigation,
  setAliasAdminPageContent,
  suggestionClick: trackRecentSuggestion,
  getSuggestionWithContentType,
  move,
  setSearchNavigation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
