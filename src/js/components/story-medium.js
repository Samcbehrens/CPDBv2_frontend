import React, {PropTypes} from 'react';
import ResponsiveComponent from 'components/responsive-component';
import FeaturedStoryImage from 'components/featured-story-image';
import {
  storyWrapperStyleDesktop, storyWrapperStyleTablet, storyWrapperStyleMobile,
  storyImageStyleMobile, storyImageStyleTablet, storyImageStyleDesktop,
  paperStyleDesktop
} from 'components/story-medium.style';



export default class StoryMedium extends ResponsiveComponent {
  renderMobile() {
    return (<div>
      <FeaturedStoryImage
        style={ storyImageStyleMobile } src={ this.props.story.url }/>
      <div>
        <div style={ storyWrapperStyleMobile }>
          <h6 style={ paperStyleDesktop }>{ this.props.story.paper }</h6>
          <p>{ this.props.story.title }</p>
        </div>
      </div>
    </div>);
  }

  renderTablet() {
    return (<div className='pure-g'>
      <div className='pure-u-2-3'>
        <FeaturedStoryImage style={ storyImageStyleTablet } src={ this.props.story.url }/>
      </div>
      <div className='pure-u-1-3'>
        <div style={ storyWrapperStyleTablet }>
          <h6 style={ paperStyleDesktop }>{ this.props.story.paper }</h6>
          <p>{ this.props.story.title }</p>
        </div>
      </div>
    </div>);
  }

  renderDesktop() {
    return (<div className='pure-g'>
      <div className='pure-u-2-3'>
        <FeaturedStoryImage style={ storyImageStyleDesktop } src={ this.props.story.url }/>
      </div>
      <div className='pure-u-1-3'>
        <div style={ storyWrapperStyleDesktop }>
          <h6 style={ paperStyleDesktop }>{ this.props.story.paper }</h6>
          <p>{ this.props.story.title }</p>
        </div>
      </div>
    </div>);
  }
}

StoryMedium.propTypes = {
  story: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
};

StoryMedium.defaultProps = {
  story: {
    paper: 'New York Times',
    title: 'Complaints against Chicago Police rarely result in discipline data shows.',
    url: 'https://static01.nyt.com/images/2015/11/19/us/19police-web1/19police-web1-superJumbo.jpg'
  }
};
