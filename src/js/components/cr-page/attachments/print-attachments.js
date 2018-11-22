import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { groupBy, startCase } from 'lodash';

import AttachmentHeader from './headers/attachment-header';
import styles from './print-attachments.sass';


export default class PrintAttachments extends Component {
  render() {
    const { items } = this.props;
    const hasData = items.length > 0;
    const attachmentTypes = groupBy(items, 'fileType');

    return (
      <div className={ cx(styles.printAttachmentsContainer) }>
        {
          hasData ? (
            <div className='attachments-content'>
              <AttachmentHeader/>
              {
                Object.keys(attachmentTypes).map((itemType, ind) => (
                  <div key={ ind } className='attachment-type'>
                    { startCase(itemType) } ({ attachmentTypes[itemType].length })
                  </div>
                ))
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}

PrintAttachments.defaultProps = {
  items: []
};

PrintAttachments.propTypes = {
  items: PropTypes.array,
};
