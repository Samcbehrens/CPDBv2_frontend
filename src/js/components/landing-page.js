import React, { Component, PropTypes } from 'react';

import StoriesContainer from 'containers/stories-container';
import FAQSection from 'components/faq/faq-section';
import TwitterEmbeddedTimeline from 'components/twitter-embedded-timeline';
import AboutSection from 'components/about-section';
import HeroSection from 'components/hero-section';
import { borderTop, leftColumnStyle } from './landing-page.style';


export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <HeroSection />
        <StoriesContainer store={ this.props.store }/>
        <div className='pure-g' style={ borderTop }>
          <div className='pure-u-de-3-5 pure-u-ta-1-2 pure-u-mo-1-2'>
            <div style={ leftColumnStyle }>
              <FAQSection/>
              <AboutSection style={ borderTop }/>
            </div>
          </div>
          <div className='pure-u-de-2-5 pure-u-ta-1-2 pure-u-mo-1-2'>
            <TwitterEmbeddedTimeline/>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object
};
