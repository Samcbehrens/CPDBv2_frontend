import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';

import InlineHeaderSection from 'components/common/carousel/inline-header-section';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import { CAROUSEL_TYPES } from 'utils/constants';


describe('Carousel Inline Edit Header components', function () {
  let instance;

  afterEach(() => {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', () => {
    InlineHeaderSection.should.be.renderable();
  });

  it('should render inline edit elements', () => {
    instance = renderIntoDocument(<InlineHeaderSection type={ CAROUSEL_TYPES.COMPLAINT }/>);
    findRenderedComponentWithType(instance, LinkTextEditable).should.be.ok();
    findRenderedComponentWithType(instance, RichTextEditable).should.be.ok();
  });
});
