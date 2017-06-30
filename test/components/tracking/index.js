import React from 'react';
import { spy } from 'sinon';
import should from 'should';

import {
  renderIntoDocument, findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Table from 'grommet/components/Table';

import HeaderBar from 'components/tracking/header-bar';
import FilterBar from 'components/tracking/filter-bar';
import SearchTrackingPage from 'components/tracking';
import { unmountComponentSuppressError, reRender } from 'utils/test';


describe('SearchTrackingPage component', function () {
  let instance;
  const trackingList = [{
    'id': 2,
    'query': 'Ke',
    'usages': 2,
    'results': 22,
    'queryType': 'free_text',
    'lastEntered': '2017-06-22T10:53:53.916552Z'
  }, {
    'id': 1,
    'query': 'Ab',
    'usages': 2,
    'results': 0,
    'queryType': 'free_text',
    'lastEntered': '2017-06-22T10:53:52.902116Z'
  }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render HeaderBar and FilterBar', function () {
    instance = renderIntoDocument(<SearchTrackingPage />);

    scryRenderedComponentsWithType(instance, HeaderBar).length.should.equal(1);
    scryRenderedComponentsWithType(instance, FilterBar).length.should.equal(1);
  });

  it('should render tracking list', function () {
    instance = renderIntoDocument(<SearchTrackingPage trackingList={ trackingList }/>);

    scryRenderedComponentsWithType(instance, TableRow).length.should.equal(2);
  });

  it('should trigger getSearchTrackingList on initialization', function () {
    const getSearchTrackingList = spy();
    instance = renderIntoDocument(<SearchTrackingPage getSearchTrackingList={ getSearchTrackingList }/>);

    getSearchTrackingList.calledWith({ 'sort': '-query' }).should.be.true();
  });

  it('should trigger changeSortField when clicking on header', function () {
    const changeSortField = spy();
    instance = renderIntoDocument(<SearchTrackingPage changeSortField={ changeSortField }/>);
    findRenderedComponentWithType(instance, TableHeader).props.onSort(1, true);

    changeSortField.calledWith({ sortIndex: 1, sortAscending: true }).should.be.true();
  });

  it('should trigger getSearchTrackingList when hasMore and not requesting', function () {
    const getSearchTrackingList = spy();
    const nextParams = { a: 'b' };
    instance = renderIntoDocument(<SearchTrackingPage getSearchTrackingList={ getSearchTrackingList }
      hasMore={ true } nextParams={ nextParams } isRequesting={ false }
    />);
    findRenderedComponentWithType(instance, Table).props.onMore();

    getSearchTrackingList.calledWith(nextParams).should.be.true();
  });

  it('should not trigger getSearchTrackingList when not hasMore', function () {
    instance = renderIntoDocument(<SearchTrackingPage hasMore={ false } />);
    should.not.exists(findRenderedComponentWithType(instance, Table).props.onMore);
  });

  it('should not trigger getSearchTrackingList when requesting', function () {
    const getSearchTrackingList = spy();
    instance = renderIntoDocument(<SearchTrackingPage getSearchTrackingList={ getSearchTrackingList }
      isRequesting={ true } hasMore={ true }
    />);
    getSearchTrackingList.calledOnce.should.be.true();
    findRenderedComponentWithType(instance, Table).props.onMore();
    getSearchTrackingList.calledOnce.should.be.true();
  });

  it('should trigger getSearchTrackingList when sort changed', function () {
    const getSearchTrackingList = spy();
    instance = renderIntoDocument(<SearchTrackingPage getSearchTrackingList={ getSearchTrackingList }
      sort={ { sortIndex: 1, sortAscending: false } }/>);
    getSearchTrackingList.calledWith({ sort: '-query' }).should.be.true();

    instance = reRender(<SearchTrackingPage getSearchTrackingList={ getSearchTrackingList }
      sort={ { sortIndex: 2, sortAscending: true } }/>, instance);
    getSearchTrackingList.calledWith({ sort: 'usages' }).should.be.true();
  });

  it('should trigger changeFilter when clicking on filter button', function () {
    const changeFilter = spy();
    instance = renderIntoDocument(<SearchTrackingPage changeFilter={ changeFilter }/>);
    findRenderedComponentWithType(instance, FilterBar).props.onFilterChange('foo');
    changeFilter.calledWith('foo').should.be.true();
  });

  it('should trigger changeSearchTerm when changeing search term', function () {
    const changeSearchTerm = spy();
    instance = renderIntoDocument(<SearchTrackingPage changeSearchTerm={ changeSearchTerm }/>);
    findRenderedComponentWithType(instance, FilterBar).props.onSearch('foo');
    changeSearchTerm.calledWith('foo').should.be.true();
  });
});
