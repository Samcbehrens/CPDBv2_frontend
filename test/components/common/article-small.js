import 'should';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import ArticleSmall from 'components/common/article-small';
import { unmountComponentSuppressError } from 'utils/test';
import 'utils/test/React';


describe('ArticleSmall component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render it\'s children', function () {
    const testText = 'this should render';
    element = renderIntoDocument(<ArticleSmall>{ testText }</ArticleSmall>);
    findDOMNode(element).innerHTML.should.containEql(testText);
  });

  it('should trigger onClick', function () {
    ArticleSmall.should.triggerCallbackWhenClick('onClick', 'article-small', { children: 'abc' });
  });
});
