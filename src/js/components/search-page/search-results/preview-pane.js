import React, { Component, PropTypes } from 'react';
import { isEmpty, get } from 'lodash';
import SlideMotion from 'components/animation/slide-motion';

import {
  OfficerPane,
  CommunityPane,
  NeighborhoodPane,
  TermPane
} from 'components/search-page/preview-pane';
import { SEARCH_BOX } from 'utils/constants';
import { wrapperStyle } from './preview-pane.style';


export default class PreviewPane extends Component {
  constructor(props) {
    super(props);
    this.renderPane = this.renderPane.bind(this);
  }

  renderPane() {
    const { data, type } = this.props;
    const paneTypes = {
      [SEARCH_BOX]: () => <TermPane { ...data } />,
      OFFICER: () => <OfficerPane { ...data }/>,
      COMMUNITY: () => <CommunityPane { ...data } />,
      NEIGHBORHOOD: () => <NeighborhoodPane { ...data } />
    };
    return get(paneTypes, type, () => null)();
  }


  render() {
    const { data } = this.props;

    return (
      <SlideMotion show={ !isEmpty(data) } offsetX={ 100 }>
        <div className='test--preview-pane' style={ wrapperStyle }>
          {
            this.renderPane()
          }
        </div>
      </SlideMotion>
    );

  }
}

PreviewPane.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string
};

PreviewPane.defaultProps = {
  data: {},
};
