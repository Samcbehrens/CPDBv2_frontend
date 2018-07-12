import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import { get, last } from 'lodash';

import {
  containerStyle,
  footerStyle,
  closeButtonStyle,
  closeInnerStyle
} from './radar-chart-explainer.style';
import TriangleExplainer from './triangle-explainer';
import ScaleExplainer from './scale-explainer';
import PercentilesByYear from './percentiles-by-year';
import LeftNavigation from './left-navigation';
import RightNavigation from './right-navigation';
import { MOBILE_BREAK_POINT } from 'utils/constants';


const NAVIGATION_TEXTS = ['What is this triangle?', 'What is the scale?', 'Percentiles by year'];

export default class RadarExplainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPaneIndex: 0,
    };

    this.navigateLeft = this.navigateLeft.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
  }

  renderExplainer() {
    const { radarChartData } = this.props;
    const lastItem = last(radarChartData);

    switch (this.state.currentPaneIndex) {
      case 1:
        return <ScaleExplainer year={ get(lastItem, 'year') } radarChartData={ get(lastItem, 'items') }/>;
      case 2:
        return <PercentilesByYear yearlyRadarChartData={ radarChartData }/>;
      default:
        return <TriangleExplainer radarChartData={ get(lastItem, 'items') }/>;
    }
  }

  getCurrentNavigationTexts() {
    const { currentPaneIndex } = this.state;
    const textLength = NAVIGATION_TEXTS.length;
    const leftNavigationIndex = (currentPaneIndex - 1 + textLength) % textLength;
    const rightNavigationIndex = (currentPaneIndex + 1) % textLength;
    return [NAVIGATION_TEXTS[leftNavigationIndex], NAVIGATION_TEXTS[rightNavigationIndex]];
  }

  navigateLeft() {
    const textLength = NAVIGATION_TEXTS.length;
    this.setState({
      currentPaneIndex: (this.state.currentPaneIndex - 1 + textLength) % textLength
    });
  }

  navigateRight() {
    this.setState({
      currentPaneIndex: (this.state.currentPaneIndex + 1) % NAVIGATION_TEXTS.length
    });
  }

  render() {
    const [leftNavigationText, rightNavigationText] = this.getCurrentNavigationTexts();

    return (
      <MediaQuery minWidth={ MOBILE_BREAK_POINT }>
        <div className='test--radar-explainer-window' style={ containerStyle }>
          { this.renderExplainer() }
          <div style={ footerStyle }>
            <LeftNavigation onClickHandler={ this.navigateLeft } text={ leftNavigationText }/>
            <RightNavigation onClickHandler={ this.navigateRight } text={ rightNavigationText }/>
          </div>
        </div>
        <div
          className='test--radar-explainer-close-button'
          style={ closeButtonStyle }
          onClick={ this.props.closeExplainer }
        >
          <div style={ closeInnerStyle }>&times;</div>
        </div>
      </MediaQuery>
    );
  }
}

RadarExplainer.propTypes = {
  radarChartData: PropTypes.array,
  closeExplainer: PropTypes.func,
};
