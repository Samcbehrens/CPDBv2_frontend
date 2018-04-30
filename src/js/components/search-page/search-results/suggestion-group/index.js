import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import { groupHeaderStyle, scrollerStyle } from './suggestion-group.style';
import SuggestionItem from './suggestion-item';
import LoadMoreButton from './load-more-button';
import { MORE_BUTTON } from 'utils/constants';
import ScrollIntoView from 'components/common/scroll-into-view';

const headerHeight = 64;

export default class SuggestionGroup extends Component {
  componentDidMount() {
    const { getSuggestionWithContentType, searchText, singleContent, header } = this.props;
    if (singleContent) {
      getSuggestionWithContentType(searchText, { contentType: header }).catch(() => {});
    }
  }

  renderHeader() {
    return (<div style={ groupHeaderStyle(headerHeight) }>{ this.props.header }</div>);
  }

  renderResults() {
    const {
      suggestions,
      focusedItem,
      aliasEditModeOn,
      setAliasAdminPageContent,
      suggestionClick,
      hasMore,
      searchText,
      nextParams,
      getSuggestionWithContentType,
      setSearchNavigation,
    } = this.props;

    return (
      <InfiniteScroll
        loadMore={ () => getSuggestionWithContentType(searchText, { ...nextParams }) }
        initialLoad={ false }
        hasMore={ hasMore }
        useWindow={ false }>
        {
          map(suggestions, (suggestion) => (
            <SuggestionItem
              selectItem={ () => setSearchNavigation({ itemIndex: suggestion.itemIndex }) }
              key={ suggestion.uniqueKey }
              aliasEditModeOn={ aliasEditModeOn }
              setAliasAdminPageContent={ setAliasAdminPageContent }
              suggestionClick={ suggestionClick }
              suggestion={ suggestion }
              isFocused={ focusedItem.uniqueKey === suggestion.uniqueKey }/>
          ))
        }
      </InfiniteScroll>
    );
  }

  renderMoreButton() {
    const { header, focusedItem, onLoadMore, showMoreButton, } = this.props;

    if (showMoreButton)
      return (
        <LoadMoreButton
          onLoadMore={ onLoadMore }
          header={ header }
          isFocused={ focusedItem.uniqueKey === `${MORE_BUTTON}-${header}` }
        />);
    else
      return null;
  }

  render() {
    const {
      singleContent,
      focusedItem
    } = this.props;

    if (singleContent) {
      return (
        <ScrollIntoView
          className='test--suggestion-group'
          style={ scrollerStyle(singleContent) }
          focusedClassName={ `suggestion-item-${focusedItem.uniqueKey}` }
          initialOffset={ headerHeight }>
          { this.renderHeader() }
          { this.renderResults() }
        </ScrollIntoView>
      );
    }
    else {
      return (
        <div style={ scrollerStyle(singleContent) } className='test--suggestion-group'>
          { this.renderHeader() }
          { this.renderResults() }
          { this.renderMoreButton() }
        </div>
      );
    }
  }
}

SuggestionGroup.propTypes = {
  suggestions: PropTypes.array,
  header: PropTypes.string,
  showMoreButton: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  setAliasAdminPageContent: PropTypes.func,
  focusedItem: PropTypes.object,
  getSuggestionWithContentType: PropTypes.func,
  hasMore: PropTypes.bool,
  searchText: PropTypes.string,
  nextParams: PropTypes.object,
  singleContent: PropTypes.bool,
  setSearchNavigation: PropTypes.func,
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  focusedItem: {},
  header: '',
  getSuggestionWithContentType: () => ({
    catch: () => {}
  })
};
