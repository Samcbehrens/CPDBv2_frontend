import React, { PureComponent, PropTypes } from 'react';
import { map, isEqual } from 'lodash';
import moment from 'moment';

import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import OcticonsQuote from 'components/icons/octicons-quote';
import Danger from 'components/icons/danger';

import FilterBar from './filter-bar';
import HeaderBar from './header-bar';

import { wrapperStyle, buttonTextStyle } from './search-tracking-style';
import { DATE_TIME_FORMAT } from 'utils/constants';
import QUERY_TYPES from './query-types';


const QUERY_ICONS = {
  [QUERY_TYPES.freeText]: OcticonsQuote,
  [QUERY_TYPES.noInteraction]: Danger
};
const HEADER_LABELS = ['', 'Query', 'Usage(s)', 'Result(s)', 'Last Entered', ''];
const QUERY_FIELDS = ['', 'query', 'usages', 'results', 'last_entered', ''];


export default class SearchTrackingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { getSearchTrackingList, sort } = this.props;
    getSearchTrackingList(this.getSortParams(sort));
  }

  componentWillReceiveProps(nextProps) {
    const { sort, getSearchTrackingList, filterParams, searchParams } = nextProps;

    if (!isEqual(sort, this.props.sort)
      || !isEqual(filterParams, this.props.filterParams)
      || !isEqual(searchParams, this.props.searchParams)) {
      getSearchTrackingList({ ...this.getSortParams(sort), ...filterParams, ...searchParams });
    }
  }

  getSortParams(sort) {
    const { sortAscending, sortIndex } = sort;
    return { sort: `${ sortAscending ? '' : '-' }${QUERY_FIELDS[sortIndex]}` };
  }

  loadMore() {
    const { nextParams, getSearchTrackingList, isRequesting } = this.props;
    if (!isRequesting) {
      getSearchTrackingList(nextParams);
    }
  }

  render() {
    const { trackingList, hasMore, changeSortField, sort, changeFilter, filter, changeSearchTerm } = this.props;
    const { sortIndex, sortAscending } = sort;

    return (
      <div style={ wrapperStyle }>
        <HeaderBar />
        <FilterBar onFilterChange={ changeFilter } filter={ filter } onSearch={ changeSearchTerm }/>
        <Table onMore={ hasMore ? this.loadMore : null }>
          <TableHeader labels={ HEADER_LABELS }
            sortIndex={ sortIndex }
            sortAscending={ sortAscending }
            onSort={
              (sortIndex, sortAscending) => changeSortField({ sortIndex, sortAscending })
            } />
          <tbody>
            {
              map(trackingList, (tracking, index) => {
                const IconComponent = QUERY_ICONS[tracking.queryType];

                return (
                  <TableRow key={ index }>
                    <td>{ <IconComponent/> }</td>
                    <td>{ tracking.query }</td>
                    <td>{ tracking.usages }</td>
                    <td>{ tracking.results }</td>
                    <td>{ moment(tracking.lastEntered).format(DATE_TIME_FORMAT) }</td>
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
  getSearchTrackingList: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool,
  changeSortField: PropTypes.func,
  sort: PropTypes.object,
  changeFilter: PropTypes.func,
  changeSearchTerm: PropTypes.func,
  filterParams: PropTypes.object,
  searchParams: PropTypes.object,
  filter: PropTypes.array
};

SearchTrackingPage.defaultProps = {
  isRequesting: false,
  trackingList: [],
  getSearchTrackingList: () => {},
  sort: {
    sortIndex: 1,
    sortAscending: false
  }
};
