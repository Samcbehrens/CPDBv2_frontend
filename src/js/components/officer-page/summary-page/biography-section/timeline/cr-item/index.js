import React, { PropTypes } from 'react';

import {
  attachmentImageStyle,
  attachmentWrapperStyle,
  categoryStyle,
  coaccusedStyle,
  dateStyle,
  detailStyle,
  findingStyle,
  kindStyle,
  kindWrapperStyle,
  moreAttachmentsStyle,
  rightStyle,
  showingStyle,
  wrapperShowingStyle
} from './cr-item.style';
import BaseItem from '../base-item';


export default class CRItem extends BaseItem {
  constructor(props) {
    super(props);

    this.height = 58;
  }

  renderAttachments() {
    const { attachments } = this.props.item;

    const [firstAttachment, ...rest] = attachments;
    if (firstAttachment) {
      return (
        <span style={ attachmentWrapperStyle }>
          {
            rest.length ?
              <span style={ moreAttachmentsStyle } className='test--more-attachment'>+{rest.length}</span>
              :
              null
          }
          <a href={ firstAttachment.url } className='test--attachment-image-href'>
            <img
              style={ attachmentImageStyle }
              src={ firstAttachment.previewImageUrl }
              className='test--attachment-image'
            />
          </a>
        </span>
      );
    }
    return <span style={ attachmentWrapperStyle }/>;
  }

  renderShowing() {
    const { item, hasBorderBottom } = this.props;

    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle(hasBorderBottom) }>
          <div style={ kindWrapperStyle }>
            <span style={ kindStyle(item.finding === 'Sustained') } className='test--cr-item-kind'>Complaint</span>
          </div>
          <span style={ detailStyle }>
            <div style={ categoryStyle } className='test--cr-item-category'>{ item.category }</div>
            <div style={ findingStyle } className='test--cr-item-finding'>{ item.finding }, { item.outcome }</div>
          </span>
          <span style={ rightStyle }>
            <span style={ coaccusedStyle } className='test--cr-item-coaccused'>1 of { item.coaccused } coaccused</span>
            { this.renderAttachments() }
            <span style={ dateStyle } className='test--cr-item-date'>{ item.date }</span>
          </span>
        </span>
      </span>
    );
  }
}

CRItem.propTypes = {
  item: PropTypes.object,
  attachments: PropTypes.array,
  hasBorderBottom: PropTypes.bool,
};
