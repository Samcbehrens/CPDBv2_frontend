import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';

import FilterBar from 'components/tracking/filter-bar';
import { unmountComponentSuppressError } from 'utils/test';
import QUERY_TYPES from 'components/tracking/query-types';


describe('FilterBar Component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    FilterBar.should.be.renderable();
  });

  it('should trigger onSearch when input value changed', function () {
    const onSearch = spy();
    instance = renderIntoDocument(<FilterBar onSearch={ onSearch }/>);
    const searchComponent = findRenderedComponentWithType(instance, Search);
    searchComponent.props.onDOMChange({
      target: {
        value: 'term'
      }
    });
    onSearch.calledWith('term').should.be.true();
  });

  it('should trigger onFilterChange when click on filter button', function () {
    const onFilterChange = spy();
    instance = renderIntoDocument(<FilterBar onFilterChange={ onFilterChange }/>);
    const freeTextButton = scryRenderedComponentsWithType(instance, Button)[0];
    const noInteractionButton = scryRenderedComponentsWithType(instance, Button)[1];
    freeTextButton.props.onClick();
    onFilterChange.calledWith(QUERY_TYPES.freeText).should.be.true();
    noInteractionButton.props.onClick();
    onFilterChange.calledWith(QUERY_TYPES.noInteraction).should.be.true();
  });
});
