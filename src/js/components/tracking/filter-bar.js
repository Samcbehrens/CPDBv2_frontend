import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import OcticonsQuote from 'components/icons/octicons-quote';
import Danger from 'components/icons/danger';
import Search from 'grommet/components/Search';

import {
  searchWrapperStyle, buttonTextStyle, searchInputWrapperStyle
} from './search-tracking-style';
import QUERY_TYPES from './query-types';


class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = debounce(props.onSearch, 100, { leading: true, trailing: false });
  }

  render() {
    const { onFilterChange, filter } = this.props;

    return (
      <div style={ searchWrapperStyle }>
        <Button icon={ <OcticonsQuote selected={ filter.indexOf(QUERY_TYPES.freeText) != -1 }/> }
          label={ <Label style={ buttonTextStyle }>Free Text</Label> }
          plain={ true } href='#'
          onClick={ () => onFilterChange(QUERY_TYPES.freeText) } />
        <Button icon={ <Danger selected={ filter.indexOf(QUERY_TYPES.noInteraction) != -1 }/> }
          label={ <Label style={ buttonTextStyle }>No Interaction</Label> }
          plain={ true } href='#'
          onClick={ () => onFilterChange(QUERY_TYPES.noInteraction) }/>
        <div style={ searchInputWrapperStyle } >
          <Search inline={ true } style={ { padding: '15px' } } responsive={ false }
            onDOMChange={ e => { this.handleChange(e.target.value); } }/>
        </div>
      </div>
    );
  }
}

export default FilterBar;

FilterBar.propTypes = {
  onFilterChange: PropTypes.func,
  onSearch: PropTypes.func,
  filter: PropTypes.array
};

FilterBar.defaultProps = {
  onSearch: () => {},
  filter: []
};
