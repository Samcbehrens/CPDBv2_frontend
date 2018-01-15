import React, { Component, PropTypes } from 'react';

import { pushPathPreserveEditMode } from 'utils/edit-path';
import * as constants from 'utils/constants';
import { searchInputStyle, searchTermsButtonStyle, wrapperStyle } from './search-box.style';
import TextInput from 'components/common/input';
import HoverableButton from 'components/common/hoverable-button';


class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.handleToggleSeachTerm = this.handleToggleSeachTerm.bind(this);
  }

  handleToggleSeachTerm() {
    if (this.props.searchTermsHidden) {
      pushPathPreserveEditMode(`${constants.SEARCH_PATH}${constants.SEARCH_TERMS_PATH}`);
    } else {
      pushPathPreserveEditMode(constants.SEARCH_PATH);
    }
  }

  render() {
    const {
      value, onChange, onEscape, onEnter, searchTermsHidden
    } = this.props;

    const keyPressHandlers = {
      esc: onEscape,
      enter: onEnter,
    };

    return (
      <div style={ wrapperStyle }>
        <TextInput
          autoFocus={ true }
          style={ searchInputStyle }
          placeholder='Search Chicago'
          onChange={ onChange }
          paddingVertical={ 9 }
          paddingHorizontal={ 9 }
          value={ value }
          keyPressHandlers={ keyPressHandlers }
          blurOnKeyPress={ ['up', 'down'] }
          spellCheck={ false }
        />
        <HoverableButton
          className='test--toggle-button'
          style={ searchTermsButtonStyle }
          onClick={ this.handleToggleSeachTerm }>
          {
            searchTermsHidden ?
              'What can I search?' :
              'Hide Search terms'
          }
        </HoverableButton>
      </div>
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  onEscape: PropTypes.func,
  onEnter: PropTypes.func,
  toggleSearchTerms: PropTypes.func,
  value: PropTypes.string,
  searchTermsHidden: PropTypes.bool
};

export default SearchBox;
