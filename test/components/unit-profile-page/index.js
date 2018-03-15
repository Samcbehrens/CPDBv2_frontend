import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { spy, stub } from 'sinon';

import UnitProfilePage from 'components/unit-profile-page';
import Header from 'components/unit-profile-page/header';
import SummaryPage from 'components/unit-profile-page/summary-page';
import { unmountComponentSuppressError } from 'utils/test';
import * as domUtils from 'utils/dom';


describe('UnitProfilePage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    unitProfilePage: {
      summary: {}
    }
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header and SummaryPage', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <UnitProfilePage />
      </Provider>
    );

    scryRenderedComponentsWithType(instance, Header).should.have.length(1);
    scryRenderedComponentsWithType(instance, SummaryPage).should.have.length(1);
  });

  it('should trigger fetchUnitProfileSummary on initialize', function () {
    const fetchUnitProfileSummary = spy();
    const unitName = '001';
    instance = renderIntoDocument(
      <Provider store={ store }>
        <UnitProfilePage unitName={ unitName } fetchUnitProfileSummary={ fetchUnitProfileSummary } />
      </Provider>
    );
    fetchUnitProfileSummary.calledWith(unitName).should.be.true();
  });

  it('should call scrollToTop after mounted', function () {
    stub(domUtils, 'scrollToTop');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <UnitProfilePage />
      </Provider>
    );

    domUtils.scrollToTop.called.should.be.true();
    domUtils.scrollToTop.restore();
  });
});
