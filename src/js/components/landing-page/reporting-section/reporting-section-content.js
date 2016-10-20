import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { arrayOfN } from 'utils/prop-validators';
import ResponsiveComponent from 'components/responsive/responsive-component';
import Story, {
  SMALL_TITLE_STYLE, NORMAL_TITLE_STYLE, BIG_TITLE_STYLE, EXTRA_BIG_TITLE_STYLE
} from 'components/common/story/story';
import { storyWrapperStyle, smallStoryStyle, divideLineStyle } from './reporting-section-content.style';


class ReportingSectionContent extends Component {
  render() {
    const { stories, onStoryClick } = this.props;

    return (
      <ResponsiveComponent
        tabletChildren={
          <div className='pure-g'>
            <div className='pure-u-1-2'>
              <Story
                story={ stories[0] }
                wrapperStyle={ storyWrapperStyle }
                storyTitleSize={ BIG_TITLE_STYLE }
                onClick={ onStoryClick }/>
            </div>
            <div className='pure-u-1-2'>
              <div className='pure-u-1-1'>
                <Story
                  story={ stories[1] }
                  wrapperStyle={ [storyWrapperStyle, smallStoryStyle.tablet] }
                  storyTitleSize={ NORMAL_TITLE_STYLE }
                  onClick={ onStoryClick }/>
              </div>
              <div style={ divideLineStyle }/>
              <div className='pure-u-1-1'>
                <Story
                  story={ stories[2] }
                  wrapperStyle={ [storyWrapperStyle, smallStoryStyle.tablet] }
                  storyTitleSize={ NORMAL_TITLE_STYLE }
                  onClick={ onStoryClick }/>
              </div>
            </div>
          </div>
        }
        desktopChildren={
          <div className='pure-g'>
            <div className='pure-u-1-2'>
              <Story
                story={ stories[0] }
                wrapperStyle={ storyWrapperStyle }
                storyTitleSize={ BIG_TITLE_STYLE }
                onClick={ onStoryClick }/>
            </div>
            <div className='pure-u-1-2'>
              <div className='pure-u-1-2'>
                <Story
                  story={ stories[1] }
                  wrapperStyle={ [storyWrapperStyle, smallStoryStyle.desktop] }
                  storyTitleSize={ SMALL_TITLE_STYLE }
                  onClick={ onStoryClick }/>
              </div>
              <div className='pure-u-1-2'>
                <Story
                  story={ stories[2] }
                  wrapperStyle={ [storyWrapperStyle, smallStoryStyle.desktop] }
                  storyTitleSize={ SMALL_TITLE_STYLE }
                  onClick={ onStoryClick }/>
              </div>
            </div>
          </div>
        }
        extraWideChildren={
          <div className='pure-g'>
            <div className='pure-u-1-2'>
              <Story
                story={ stories[0] }
                wrapperStyle={ storyWrapperStyle }
                storyTitleSize={ EXTRA_BIG_TITLE_STYLE }
                onClick={ onStoryClick }/>
            </div>
            <div className='pure-u-1-2'>
              <div className='pure-u-1-2'>
                <Story
                  story={ stories[1] }
                  wrapperStyle={ [storyWrapperStyle, smallStoryStyle.desktop] }
                  storyTitleSize={ NORMAL_TITLE_STYLE }
                  onClick={ onStoryClick }/>
              </div>
              <div className='pure-u-1-2'>
                <Story
                  story={ stories[2] }
                  wrapperStyle={ [storyWrapperStyle, smallStoryStyle.desktop] }
                  storyTitleSize={ NORMAL_TITLE_STYLE }
                  onClick={ onStoryClick }/>
              </div>
            </div>
          </div>
        }/>
    );
  }
}

ReportingSectionContent.propTypes = {
  stories: arrayOfN(3),
  onStoryClick: PropTypes.func
};

export default ConfiguredRadium(ReportingSectionContent);
