import React, { PureComponent, PropTypes } from 'react';
import { map } from 'lodash';

import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Search from 'grommet/components/Search';
import Label from 'grommet/components/Label';
import OcticonsQuote from 'components/icons/octicons-quote';
import Danger from 'components/icons/danger';

import {
  wrapperStyle, headingWrapperStyle, headingStyle, aliasButtonStyle, aliasButtonTextStyle,
  searchWrapperStyle, buttonTextStyle, searchInputWrapperStyle
} from './search-tracking-style';


const QUERY_TYPES = {
  freeText: 'free_text',
  noInteraction: 'no_interaction'
};

const QUERY_ICONS = {
  [QUERY_TYPES.freeText]: OcticonsQuote,
  [QUERY_TYPES.noInteraction]: Danger
};

const HEADER_LABELS = ['', 'Query', 'Usage(s)', 'Result(s)', 'Last Entered', ''];
const QUERY_FIELDS = ['', 'query', 'usages', 'results', 'last_entered', ''];


const FilterBar = (props) => (
  <div style={ searchWrapperStyle }>
    <Button icon={ <OcticonsQuote/> }
      label={ <Label style={ buttonTextStyle }>Free Text</Label> }
      plain={ true } href='#'/>
    <Button icon={ <Danger/> }
      label={ <Label style={ buttonTextStyle }>No Interaction</Label> }
      plain={ true } href='#'/>
    <div style={ searchInputWrapperStyle } >
      <Search size='small' inline={ true } style={ { padding: '15px' } }/>
    </div>
  </div>
);


const HeaderBar = (props) => (
  <div style={ headingWrapperStyle }>
    <Heading style={ headingStyle }>Search Box Tracking</Heading>
    <Button style={ aliasButtonStyle } href='#' plain={ true }
      label={ <Label style={ aliasButtonTextStyle } >Add Alias</Label> } />
  </div>
);


export default class SearchTrackingPage extends PureComponent {
  constructor(props) {
    super(props);

    this.sortIndex = 1;
    this.sortAscending = false;
  }

  componentDidMount() {
    this.callGetTrackingListAPI();
  }

  callGetTrackingListAPI() {
    const { getSearchTrackingList } = this.props;

    const sort = this.sortAscending ? 'asc' : 'desc';
    const sortField = QUERY_FIELDS[this.sortIndex];
    getSearchTrackingList({
      sort,
      'sort_field': sortField
    });
  }

  updateCurrentSortState(sortAscending, sortIndex) {
    this.sortAscending = sortAscending;
    this.sortIndex = sortIndex;
  }

  render() {
    const { isRequesting, trackingList } = this.props;

    if (isRequesting) {
      return <div className='test--loading-text'>Loading...</div>;
    }

    return (
      <div style={ wrapperStyle }>
        <HeaderBar />
        <FilterBar />
        <Table>
          <TableHeader labels={ HEADER_LABELS }
            sortIndex={ this.sortIndex }
            sortAscending={ this.sortAscending }
            onSort={
              (sortIndex, sortAscending) => {
                if (sortIndex != 0 || sortIndex != HEADER_LABELS.length - 1) {
                  this.updateCurrentSortState(sortAscending, sortIndex);
                  this.callGetTrackingListAPI();
                }
              }
            } />
          <tbody>
            {
              map(trackingList, (tracking, index) => {
                const IconComponent = QUERY_ICONS[tracking.queryType];

                return (
                  <TableRow key={ index }>
                    <td>{ <IconComponent/> }</td>
                    {
                      map(['query', 'usages', 'results', 'lastEntered'], field => {
                        return <td key={ field }>{ tracking[field] }</td>;
                      })
                    }
                    <td><Button label={ <Label style={ buttonTextStyle }>Add</Label> } href='#' plain={ true }/></td>
                  </TableRow>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

SearchTrackingPage.propTypes = {
  isRequesting: PropTypes.bool,
  trackingList: PropTypes.array,
  getSearchTrackingList: PropTypes.func
};

SearchTrackingPage.defaultProps = {
  isRequesting: false,
  trackingList: [],
  getSearchTrackingList: () => {}
};
