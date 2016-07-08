import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { requestStories, loadMoreStories } from 'actions/stories-page/non-featured-stories';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import {
  dataAvailableSelector, moreDataAvailableSelector, nonFeaturedStoriesSelector, paginationSelector
} from 'selectors/stories-page/non-featured-stories-selector';
import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoriesPlaceHolder from 'components/stories-page/stories-place-holder';


export class UnconnectedNonFeaturedStoriesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.props.requestStories({ 'ordering': '-is_featured,path', offset: '6' });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { loadMoreStories, pagination, moreDataAvailable } = this.props;

    if ((window.scrollY + window.innerHeight >= window.document.body.offsetHeight) && pagination.next
        && moreDataAvailable) {
      loadMoreStories(pagination.next);
    }
  }

  render() {
    const { dataAvailable, moreDataAvailable, nonFeaturedStories, openBottomSheetWithStory } = this.props;

    if (dataAvailable) {
      return (
        <NonFeaturedStories stories={ nonFeaturedStories } handleStoryClick={ openBottomSheetWithStory }
          moreDataAvailable={ moreDataAvailable }/>
      );
    } else {
      return (
        <StoriesPlaceHolder/>
      );
    }
  }
}

UnconnectedNonFeaturedStoriesContainer.propTypes = {
  requestStories: PropTypes.func.isRequired,
  loadMoreStories: PropTypes.func.isRequired,
  openBottomSheetWithStory: PropTypes.func.isRequired,
  dataAvailable: PropTypes.bool,
  moreDataAvailable: PropTypes.bool,
  nonFeaturedStories: PropTypes.array,
  pagination: PropTypes.object,
  store: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    moreDataAvailable: moreDataAvailableSelector(state),
    nonFeaturedStories: nonFeaturedStoriesSelector(state),
    pagination: paginationSelector(state)
  };
}

const mapDispatchToProps = {
  requestStories,
  loadMoreStories,
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedNonFeaturedStoriesContainer);
