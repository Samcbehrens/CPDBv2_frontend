import React, { PropTypes, Component } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './print-notes.sass';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';


export default class PrintNotes extends Component {
  render() {
    const { notes, className } = this.props;
    return (
      <div className={ `${styles.printNotes} ${className}` }>
        <div className='notes-title'>Notes</div>
        {
          notes.map((note, index) => (
            <ReactMarkdown
              key={ index }
              className='notes-content'
              source={ `${note.title}: ${note.text}` }
              renderers={ { link: MarkdownLink } }
            />
          ))
        }
      </div>
    );
  }
}

PrintNotes.propTypes = {
  notes: PropTypes.array,
  className: PropTypes.string,
};

PrintNotes.defaultProps = {
  notes: [],
};
