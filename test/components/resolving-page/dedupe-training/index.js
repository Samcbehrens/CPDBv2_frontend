import React from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType, Simulate, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';

import { unmountComponentSuppressError } from 'utils/test';
import DedupeTraining from 'components/resolving-page/dedupe-training';


describe('<DedupeTraining>', () => {
  let instance;

  afterEach(() => {
    unmountComponentSuppressError(instance);
  });

  it('should render title and search box', () => {
    instance = renderIntoDocument(<DedupeTraining />);

    scryRenderedComponentsWithType(instance, Title).should.have.length(1);
    scryRenderedComponentsWithType(instance, Search).should.have.length(1);
  });

  it('should send ajax request to server for training', () => {
    const train = spy(() => Promise.resolve());

    instance = renderIntoDocument(<DedupeTraining train={ train } />);
    const matchButton = findRenderedDOMComponentWithClass(instance, 'test--matched-button');

    Simulate.click(matchButton);

    train.called.should.be.true();
    train.args[0][0].should.be.equal('matched');


    const unmatchButton = findRenderedDOMComponentWithClass(instance, 'test--unmatched-button');

    Simulate.click(unmatchButton);

    train.args[1][0].should.be.equal('unmatched');
  });

  it('should fetch another training data after any successful matching', () => {
    const train = spy(() => Promise.resolve());
    const fetch = spy();

    instance = renderIntoDocument(<DedupeTraining train={ train } fetchTrainingData={ fetch } />);
    const matchButton = findRenderedDOMComponentWithClass(instance, 'test--matched-button');

    Simulate.click(matchButton);

    fetch.called.should.be.true();
  });
});
