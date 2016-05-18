import React, { PropTypes } from 'react';
import Radium from 'radium';

import { arrayOfN } from 'utils/prop-validators';
import ArticleFooter from 'components/common/article-footer';
import ArticleContent from 'components/common/article-content';
import StoryMedium from 'components/stories/story-medium';
import ArticleSmall from 'components/common/article-small';
import SectionHeader from 'components/common/section-header';
import ResponsiveComponent from 'components/responsive/responsive-component';
import {
  firstSmallStoryStyleTablet, firstSmallStoryStyleDesktop, wrapperStyle
} from './stories.style';



class Stories extends ResponsiveComponent {
  constructor(props) {
    super(props);
  }

  renderSmallStoriesTablet(stories) {
    return stories.map((story, ind) => {
      return (
        <ArticleSmall
          onClick={ this.props.onStoryClick }
          style={ ind === 0 ? firstSmallStoryStyleTablet : null }
          key={ story.id } header={ story.paper }>
          <ArticleContent>{ story.title }</ArticleContent>
        </ArticleSmall>
      );
    });
  }

  renderSmallStoriesDesktop(stories) {
    return stories.map((story, ind) => {
      return (
        <div key={ story.id } className='pure-u-1-2'>
          <ArticleSmall
            onClick={ this.props.onStoryClick }
            style={ ind === 0 ? firstSmallStoryStyleDesktop : null }
            header={ story.paper }>
            <ArticleContent>{ story.title }</ArticleContent>
          </ArticleSmall>
        </div>
      );
    });
  }

  renderTablet() {
    const { featuredStory, smallStories, onStoryClick } = this.props;
    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-1-1'>
          <SectionHeader>Featured Stories</SectionHeader>
        </div>
        <div className='pure-u-3-4'>
          <StoryMedium story={ featuredStory } onClick={ onStoryClick }/>
        </div>
        <div className='pure-u-1-4'>
          { this.renderSmallStoriesTablet(smallStories) }
        </div>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const { featuredStory, smallStories, onStoryClick } = this.props;
    return (
      <div className='pure-g' style={ wrapperStyle }>
        <div className='pure-u-1-1'>
          <SectionHeader>Featured Stories</SectionHeader>
        </div>
        <div className='pure-u-3-5'>
          <StoryMedium story={ featuredStory } onClick={ onStoryClick }/>
        </div>
        <div className='pure-g pure-u-2-5'>
          { this.renderSmallStoriesDesktop(smallStories) }
        </div>
        <div className='pure-u-1-1'>
          <ArticleFooter>More Stories</ArticleFooter>
        </div>
      </div>
    );
  }
}

Stories.propTypes = {
  featuredStory: PropTypes.object,
  smallStories: arrayOfN(2),
  onStoryClick: PropTypes.func
};

export default Radium(Stories);
