import React from 'react';
import {
  scryRenderedComponentsWithType, scryRenderedDOMComponentsWithClass, Simulate,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { withAnimationDisabled, renderInDragDropContext, unmountComponentSuppressError } from 'utils/test';
import FAQListSection from 'components/faq-page/faq-list-section';
import DraggableFAQListItem from 'components/faq-page/draggable-faq-list-item';
import FAQListItem from 'components/faq-page/faq-list-item';
import * as trackUtil from 'utils/tracking';




describe('FAQListSection', function () {
  let instance, stubtrackIntercomClickedFaqEvent;
  const faqs = [
    { id: 1, fieldProps: { question: {} }, meta: { order: 1, starred: false } },
    { id: 2, fieldProps: { question: {} }, meta: { order: 2, starred: false } },
    { id: 3, fieldProps: { question: {} }, meta: { order: 3, starred: false } }
  ];

  beforeEach(function () {
    stubtrackIntercomClickedFaqEvent = stub(trackUtil, 'trackIntercomClickedFaqEvent');
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    stubtrackIntercomClickedFaqEvent.restore();
  });

  it('should be renderable', function () {
    FAQListSection.should.be.renderable({ faqs: [] });
  });

  it('should render faq-list-item', function () {
    const requestFAQs = spy();
    instance = renderInDragDropContext(
      <FAQListSection faqs={ faqs } requestFAQs={ requestFAQs }/>
    );

    scryRenderedComponentsWithType(instance, DraggableFAQListItem).should.have.length(3);
    scryRenderedComponentsWithType(instance, FAQListItem).should.have.length(3);
  });

  it('should openBottomSheetWithFAQ when click on faq-item with editModeOn', function () {
    const openBottom = spy();
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSection editModeOn={ true }
        faqs={ faqs } openBottomSheetWithFAQ={ openBottom } requestFAQs={ requestFAQs }/>
    );

    withAnimationDisabled(function () {
      const faq = scryRenderedDOMComponentsWithClass(instance, 'faq-title')[0];

      Simulate.click(faq);
      openBottom.calledWith(faqs[0].id).should.be.true();
    });
  });

  it('should not render add-faq-btn button without editModeOn', function () {
    const faqs = [];
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSection faqs={ faqs } requestFAQs={ requestFAQs }/>
    );

    scryRenderedDOMComponentsWithClass(instance, 'add-faq-btn').length.should.equal(0);
  });

  it('should render add-faq-btn button with editModeOn', function () {
    const faqs = [];
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSection editModeOn={ true } faqs={ faqs } requestFAQs={ requestFAQs }/>
    );

    scryRenderedDOMComponentsWithClass(instance, 'add-faq-btn').length.should.equal(1);
  });

  it('should openBottomSheetToCreateFAQ when click add-faq-btn', function () {
    const faqs = [];
    const openBottom = spy();
    const requestFAQs = spy();

    instance = renderInDragDropContext(
      <FAQListSection editModeOn={ true }
        faqs={ faqs } openBottomSheetToCreateFAQ={ openBottom } requestFAQs={ requestFAQs }/>
    );

    withAnimationDisabled(function () {
      const addFAQBtn = findRenderedDOMComponentWithClass(instance, 'add-faq-btn');

      Simulate.click(addFAQBtn);

      openBottom.called.should.be.true();
    });
  });
});
