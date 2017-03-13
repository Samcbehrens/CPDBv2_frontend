import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { assign } from 'lodash';

import ReportContainer from 'containers/bottom-sheet/report';
import FAQContainer from 'containers/bottom-sheet/faq';
import OfficerContainer from 'containers/officer-page';
import { overlayStyle, sheetStyle, sheetWrapperStyle, closeBottomSheetTriggerStyle } from './bottom-sheet.style';
import { BottomSheetContentType } from 'utils/constants';
import { defaultConfig } from 'utils/spring-presets';
import { recalculateStickyness } from 'components/common/sticky-header';


export default class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.contentMap = {
      [BottomSheetContentType.REPORT]: ReportContainer,
      [BottomSheetContentType.FAQ]: FAQContainer,
      [BottomSheetContentType.OFFICER]: OfficerContainer
    };
  }

  componentWillReceiveProps(nextProps) {
    this.prevContent = this.props.content;
  }

  getContent() {
    if (this.props.content === null) {
      return this.prevContent;
    }
    return this.props.content;
  }

  renderOverlay(style={}) {
    return (
      <div
        className='bottom-sheet__overlay'
        style={ assign({}, overlayStyle, style) }/>
    );
  }

  renderOverlayAnimation() {
    const { open } = this.props;
    const defaultStyle = { opacity: open ? .8 : 0 };
    const motionStyle = {
      opacity: spring( open ? .8 : 0, defaultConfig())
    };

    if (global.disableAnimation) {
      return open ? this.renderOverlay({ opacity: .8 }) : null;
    }

    return (
      <Motion
        defaultStyle={ defaultStyle }
        style={ motionStyle }>
        { ({ opacity }) => {
          if (opacity === 0 && !open) {
            return null;
          }
          return this.renderOverlay({ opacity });
        } }
      </Motion>
    );
  }

  renderContent() {
    const content = this.getContent();
    const { location } = this.props;

    if (content) {
      const contentClass = this.contentMap[content.type];
      if (contentClass) {
        return React.createElement(
          contentClass,
          {
            turnOffSectionEditMode: this.props.onClose,
            sectionEditModeOn: this.context.editModeOn,
            id: content.id,
            location
          }
        );
      }
    }
    return null;
  }

  renderBottomSheet(style={}) {
    return (
      <div className='test--bottom-sheet-wrapper' style={ assign({}, sheetWrapperStyle, style) }
        onScroll={ recalculateStickyness }>
        <div className='test--close-bottom-sheet'
          style={ closeBottomSheetTriggerStyle } onClick={ () => this.props.onClose() } />
        <div style={ sheetStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }

  renderBottomSheetAnimation() {
    const { open } = this.props;
    const height = 44 - window.innerHeight;

    if (global.disableAnimation) {
      return open ? this.renderBottomSheet({ bottom: '0px' }) : null;
    }

    return (
      <Motion
        defaultStyle={ { bottom: open ? 0 : height } }
        style={ { bottom: spring(open ? 0 : height, defaultConfig()) } }>
        { ({ bottom }) => {
          if (bottom === height && !open) {
            return null;
          }
          return this.renderBottomSheet({ bottom: `${bottom}px` });
        } }
      </Motion>
    );
  }

  render() {
    return (
      <div>
        { this.renderOverlayAnimation() }
        { this.renderBottomSheetAnimation() }
      </div>
    );
  }
}

BottomSheet.propTypes = {
  open: PropTypes.bool,
  content: PropTypes.shape({
    type: PropTypes.object,
    props: PropTypes.object
  }),
  location: PropTypes.object,
  onClose: PropTypes.func
};

BottomSheet.contextTypes = {
  editModeOn: PropTypes.bool
};
