import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import _ from 'lodash';
import {TransitionMotion, spring} from 'react-motion';

import {innerHeight} from 'utils/dom';
import ArticleFooter from 'components/common/article-footer';
import StoryMedium from 'components/story-medium';
import StorySmall from 'components/story-small';
import StoryExpanded from 'components/story-expanded';
import ResponsiveComponent from 'components/responsive-component';
import {
  firstSmallStoryStyleMobile, firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop
} from 'components/stories.style';


class Stories extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStoryKey: null,
      expandedStoryHeight: 1000
    };
    this.onStoryOpen = this.onStoryOpen.bind(this);
    this.onStoryClose = this.onStoryClose.bind(this);
  }

  onStoryOpen(story) {
    this.setState({selectedStoryKey: story.id});
  }

  onStoryClose(story) {
    this.setState({selectedStoryKey: null});
  }

  getFeaturedStory() {
    let restStories = this.props.stories.slice(0);
    let featuredStory = _.remove(restStories, (story) => {
      return story.id === this.props.featuredStoryId;
    })[0];
    return [featuredStory, restStories];
  }

  renderMobile() {
    return (
      <div>
        <StoryMedium story={ this.props.stories[0] }/>
        <div className='pure-g'>
          <div className='pure-u-1-2'>
            <StorySmall style={ firstSmallStoryStyleMobile } story={ this.props.stories[1] }/>
          </div>
          <div className='pure-u-1-2'>
            <StorySmall story={ this.props.stories[2] }/>
          </div>
        </div>
        <ArticleFooter>More Stories</ArticleFooter>
      </div>
    );
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
            style={ ind === 0 ? firstSmallStoryStyleDesktop : null }
            story={ story } onOpen={ this.onStoryOpen } onClose={ this.onStoryClose }
            expanded={ story.id === this.state.selectedStoryKey }/>
        </div>
      );
    });
  }

  renderStoryExpanded() {
    if (this.state.selectedStoryKey && this.state.selectedStoryKey !== this.state.prevSelectedStoryKey) {
      return (
        <StoryExpanded
          className='pure-u-1-1' style={ {height: 0} }
          ref={ component => {
            if (component) {
              this.setState({
                expandedStoryHeight: innerHeight(ReactDOM.findDOMNode(component)),
                prevSelectedStoryKey: this.state.selectedStoryKey
              });
            }
          } }/>
      );
    } else {
      return (
        <TransitionMotion
          willEnter={ () => ({height: 0}) }
          willLeave={ () => ({height: spring(0)}) }
          defaultStyles={ this.state.selectedStoryKey ?
            [{key: '1', style: {height: 0}}] : [] }
          styles={ this.state.selectedStoryKey ?
            [{key: '1', style: {height: spring(this.state.expandedStoryHeight)}}]
            : [] }>
          { (interpolatedStyles) => {
            let config = interpolatedStyles[0];
            if (config) {
              return (
                <StoryExpanded
                  className='pure-u-1-1'
                  style={ config.style }/>
              );
            }
            return null;
          } }
        </TransitionMotion>
      );
    }
  }

  renderDesktop() {
    let [featuredStory, restStories] = this.getFeaturedStory();
    return (
      <div className='pure-g'>
        <div className='pure-u-3-5'>
          <StoryMedium story={ featuredStory }/>
        </div>
        <div className='pure-g pure-u-2-5'>
          { this.renderSmallStories(restStories) }
        </div>
        { this.renderStoryExpanded() }
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  featuredStoryId: PropTypes.number,
  stories: (props, propName, componentName) => {
    if ( props[propName].length !== 3 ) {
      return new Error(`${propName} must be an array of exactly 3 elements.`);
    }
  }
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
