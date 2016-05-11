import React from 'react';

import StoriesContainer from 'components/stories/stories-container';
import Header from 'components/header';
import FAQContainer from 'components/faq/faq-container';
import TweetContainer from 'components/tweet-container';
import { borderTop, borderRight } from './landing-page.style';


export default class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div style={ borderTop }>
          <StoriesContainer/>
        </div>
        <div className='pure-g' style={ borderTop }>
          <div className='pure-u-de-3-5 pure-u-ta-1-2 pure-u-mo-1-2' style={ borderRight }>
            <FAQContainer/>
          </div>
          <div className='pure-u-de-2-5 pure-u-ta-1-2 pure-u-mo-1-2'>
            <TweetContainer/>
          </div>
        </div>
      </div>
    );
  }
}
