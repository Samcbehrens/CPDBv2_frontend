import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';
import Scroller from './scroller';


export default class SmoothScroller extends Component {
  constructor(props) {
    super(props);
    this.handleScrollerElementRef = this.handleScrollerElementRef.bind(this);
    this.prevScrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    this.prevSelectedItemTop = this.props.selectedItemTop;
  }

  getScrollTop() {
    if (!this.scrollerEl) {
      return 0;
    }
    const { selectedItemTop } = this.props;
    if (selectedItemTop !== this.prevSelectedItemTop) {
      const [top, scrollTop] = this.getScrollerTopScrollTop();
      this.prevScrollTop = selectedItemTop - top + scrollTop;
    }
    return this.prevScrollTop;
  }

  handleScrollerElementRef(el) {
    this.scrollerEl = el;
  }

  getScrollerTopScrollTop() {
    const { top } = this.scrollerEl.getBoundingClientRect();
    return [top, this.scrollerEl.scrollTop];
  }

  render() {
    const { style, children } = this.props;
    const _scrollTop = this.getScrollTop();
    return (
      <Motion style={ { scrollTop: spring(_scrollTop, defaultConfig()) } } defaultStyle={ { scrollTop: _scrollTop } }>
      { ({ scrollTop }) => (
        <Scroller style={ style } scrollTop={ scrollTop }
          onElementRef={ this.handleScrollerElementRef }>
        { children }
        </Scroller>
      ) }
      </Motion>
    );
  }
}

SmoothScroller.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  selectedItemTop: PropTypes.number
};
