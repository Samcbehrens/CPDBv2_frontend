import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ListWidget from 'components/search-page/preview-pane/widgets/list-widget';
import HoverableLink from 'components/common/hoverable-link';


describe('ListWidget', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain number of allegations', () => {
    const complaintCategories = [
      {
        'id': 1,
        'name': 'Category Name 1',
        'count': 90
      },
      {
        'id': 2,
        'name': 'Category Name 2',
        'count': 32
      },
    ];
    instance = renderIntoDocument(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--list-widget');
    const categories = instanceDOM.getElementsByTagName('li');
    categories[0].textContent.should.containEql('Category Name 1');
    categories[0].textContent.should.containEql('90 allegations');
    categories[1].textContent.should.containEql('Category Name 2');
    categories[1].textContent.should.containEql('32 allegations');
  });

  it('should render HoverableLink if url is avaiblle', () => {
    const complaintCategories = [
      {
        'id': 1,
        'name': 'Category Name 1',
        'count': 90,
        'url': 'url_1',
      },
      {
        'id': 2,
        'name': 'Category Name 2',
        'count': 32,
      },
    ];
    instance = renderIntoDocument(
      <ListWidget
        typeName='allegation'
        items={ complaintCategories }
        title='TITLE'
      />
    );
    const firstListItem = findRenderedComponentWithType(instance, HoverableLink);
    firstListItem.props.to.should.eql('url_1');
  });

  it('should not display when items is empty', () => {
    instance = renderIntoDocument(
      <ListWidget items={ [] } typeName='allegation' />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--list-widget').should.have.length(0);
  });
});
