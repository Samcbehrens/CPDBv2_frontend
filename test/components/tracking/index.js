import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';

import SearchTrackingPage from 'components/tracking';
import { unmountComponentSuppressError } from 'utils/test';


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

  it('should render Loading... when requesting', function () {
    instance = renderIntoDocument(<SearchTrackingPage isRequesting={ true } />);

    findRenderedDOMComponentWithClass(instance, 'test--loading-text');
  });

  it('should render tracking list', function () {
    instance = renderIntoDocument(<SearchTrackingPage trackingList={ trackingList }/>);

    scryRenderedComponentsWithType(instance, TableRow).length.should.equal(2);
  });

  it('should trigger getSearchTrackingList on initialization', function () {
    const getSearchTrackingList = spy();
    instance = renderIntoDocument(<SearchTrackingPage getSearchTrackingList={ getSearchTrackingList }/>);

    getSearchTrackingList.calledWith({ 'sort': 'desc', 'sort_field': 'query' }).should.be.true();
  });

  it('should trigger getSearchTrackingList when clicking on header', function () {
    const getSearchTrackingList = spy();
    instance = renderIntoDocument(<SearchTrackingPage getSearchTrackingList={ getSearchTrackingList }/>);
    findRenderedComponentWithType(instance, TableHeader).props.onSort(1, true);

    getSearchTrackingList.calledWith({ 'sort': 'asc', 'sort_field': 'query' }).should.be.true();
  });
});
