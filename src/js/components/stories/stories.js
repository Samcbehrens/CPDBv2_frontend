import React, { PropTypes } from 'react';
import Radium from 'radium';
import { remove } from 'lodash';

import { arrayOfN } from 'utils/prop-validators';
import ArticleFooter from 'components/common/article-footer';
import StoryMedium from 'components/stories/story-medium';
import StorySmall from 'components/stories/story-small';
import StoryExpanded from 'components/stories/story-expanded';
import ResponsiveComponent from 'components/responsive/responsive-component';
import ExpandTransition from 'components/animation/expand-transition';
import {
  firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop
} from './stories.style';


class Stories extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStoryKey: null,
      storyExpanded: {}
    };
    this.onStoryOpen = id => { this.setState({ selectedStoryKey: id }); };
    this.onStoryClose = id => { this.setState({ selectedStoryKey: null }); };
  }

  getFeaturedStory() {
    let restStories = this.props.stories.slice(0);
    let featuredStory = remove(restStories, (story) => {
      return story.id === this.props.featuredStoryId;
    })[0];
    return [featuredStory, restStories];
  }

  renderMobile() {
    return this.renderTablet();
  }

  renderTablet() {
    return (
      <div className='pure-g'>
        <div className='pure-u-3-4'>
          <StoryMedium story={ this.props.stories[0] }/>
        </div>
        <div className='pure-u-1-4'>
          <StorySmall style={ firstSmallStoryStyleTablet } story={ this.props.stories[1] }/>
          <StorySmall story={ this.props.stories[2] }/>
        </div>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }

  renderSmallStories(stories) {
    return stories.map((story, ind) => {
      return (
        <div key={ story.id } className='pure-u-1-2'>
          <StorySmall
            style={ ind === 0 ? firstSmallStoryStyleDesktop : null } story={ story }
            onOpen={ this.onStoryOpen }
            onClose={ this.onStoryClose }
            expanded={ this.state.storyExpanded[story.id] } identifier={ story.id }
            active={ story.id === this.state.selectedStoryKey }/>
        </div>
      );
    });
  }

  renderDesktop() {
    let [featuredStory, restStories] = this.getFeaturedStory();
    return (
      <div className='pure-g'>
        <div className='pure-u-3-5'>
          <StoryMedium
            story={ featuredStory }
            onOpen={ this.onStoryOpen }
            onClose={ this.onStoryClose }
            expanded={ this.state.storyExpanded[featuredStory.id] } identifier={ featuredStory.id }
            active={ featuredStory.id === this.state.selectedStoryKey }/>
        </div>
        <div className='pure-g pure-u-2-5'>
          { this.renderSmallStories(restStories) }
        </div>
        <ExpandTransition
          childKey={ this.state.selectedStoryKey }
          onFullyClosed={ (key) => {this.setState({ storyExpanded: { [key]: false } });} }
          onExpansionBegin={ (key) => {this.setState({ storyExpanded: { [key]: true } });} }>
          <StoryExpanded className='pure-u-1-1'/>
        </ExpandTransition>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  featuredStoryId: PropTypes.number,
  stories: arrayOfN(3)
};

Stories.defaultProps = {
  featuredStoryId: 1,
  stories: [
    {
      id: 1,
      paper: 'New York Times',
      title: 'Complaints against Chicago Police rarely result in discipline data shows.',
      imageUrl: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
    },
    {
      id: 2,
      paper: 'FiveThirtyEight',
      title: 'How to predict bad cops in Chicago.'
    },
    {
      id: 3,
      paper: 'Chicago Magazine',
      title: 'The Laquan McDonald Video Didn\'t "Rip" Chicago Apart, but Now Its Leaders Face a Reckoning.'
    }
  ]
};

export default Radium(Stories);
