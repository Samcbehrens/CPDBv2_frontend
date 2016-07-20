import React from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedComponentWithType, findRenderedDOMComponentWithClass, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { withAnimationDisabled } from 'utils/test';
import FAQListItem from 'components/faq-page/faq-list-item';
import RawFAQFactory from 'utils/test/factories/raw-faq';
import { unmountComponentSuppressError } from 'utils/test';
import FAQItemContent from 'components/faq-page/faq-item-content';


describe('FAQListItem component', function () {
  let instance;
  const faq = RawFAQFactory.build();
  const handleClick = spy();

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQListItem.should.be.renderable({ faq, handleClick });
  });

  it('should expand content when receive newProps', function () {
    const TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { expandedId: null };
      },
      render() {
        return (
          <FAQListItem ref='faqItem' expandedId={ this.state.expandedId }
            faq={ faq } handleClick={ handleClick }/>
        );
      }
    }));
    instance = renderIntoDocument(TestParent());
    scryRenderedComponentsWithType(instance, FAQItemContent).length.should.equal(0);

    withAnimationDisabled(function () {
      instance.setState({ expandedId: faq.id });

      findRenderedComponentWithType(instance, FAQItemContent).should.be.ok();
    });
  });

  it('should trigger handleClick', function () {
    instance = renderIntoDocument(<FAQListItem faq={ faq } handleClick={ handleClick }/>);
    const titleElement = findRenderedDOMComponentWithClass(instance, 'faq-title');

    Simulate.click(titleElement);
    handleClick.calledOnce.should.be.true();
  });
});