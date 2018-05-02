import React, { Component, PropTypes } from 'react';

import WidgetWrapper, { HeaderWidget, TextWidget } from './widgets';


export default class TermPane extends Component {
  render() {
    const { name, content } = this.props;
    const communityDefinition = (
      <p>Chicago is divided into 77
        <a
          href='https://en.wikipedia.org/wiki/Community_areas_in_Chicago'
          style={ { textDecoration: 'none', color: 'blue' } }>
          community areas
        </a>.
        These boundaries date back to the 1920s and have only been modified slightly in the intervening years.
        Community areas frequently contain multiple neighborhoods, but also often align fairly closely with
        existing
        community boundaries.
      </p>
    );
    return (
      <WidgetWrapper>
        <HeaderWidget title={ name }/>
        <TextWidget title='' content={ content || communityDefinition } showFullWidth={ true }/>
      </WidgetWrapper>
    );
  }
}

TermPane.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string
};
