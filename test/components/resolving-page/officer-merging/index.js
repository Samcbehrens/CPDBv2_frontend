import React from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedDOMComponentWithClass, Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';


import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerMerging from 'components/resolving-page/officer-merging';
import OfficerForm from 'components/resolving-page/officer-form';



describe('<OfficerMerging />', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render title and search box', function () {
    instance = renderIntoDocument(<OfficerMerging />);

    scryRenderedComponentsWithType(instance, Title).should.have.length(1);
    scryRenderedComponentsWithType(instance, Search).should.have.length(1);
  });

  it('should render record', function () {
    const record = {
      'first_name': 'Foo'
    };
    const records = [{
      'record': record,
      'candidate': {}
    }];


    instance = renderIntoDocument(<OfficerMerging records={ records }/>);
    const officerForms = scryRenderedComponentsWithType(instance, OfficerForm);
    officerForms.should.have.length(2);
    officerForms[1].props.officer.should.eql(record);
  });

  it('should render the candidate', function () {
    const candidate = {
      'first_name': 'Foo',
      'last_name': 'Bar'
    };
    const records = [{
      'record': {},
      'candidate': candidate
    }];

    instance = renderIntoDocument(<OfficerMerging records={ records } />);
    const officerForms = scryRenderedComponentsWithType(instance, OfficerForm);
    officerForms.should.have.length(2);
    officerForms[0].props.officer.should.eql(candidate);
  });

  it('should come to next page if we click on the next button', function () {
    const handleNext = spy();

    instance = renderIntoDocument(<OfficerMerging handleNext={ handleNext } />);
    const nextButton = findRenderedDOMComponentWithClass(instance, 'test--next-button');

    Simulate.click(nextButton);

    handleNext.called.should.be.true();
  });

  it('should come to previous page if we click on the previous button', function () {
    const handlePrevious = spy();

    instance = renderIntoDocument(<OfficerMerging handlePrevious={ handlePrevious } />);
    const prevButton = findRenderedDOMComponentWithClass(instance, 'test--previous-button');

    Simulate.click(prevButton);

    handlePrevious.called.should.be.true();
  });

  describe('select candidate', function () {
    it('should fetch unmatchable data by default record', function () {
      const deleteUnmergeable = spy(() => Promise.resolve());
      const fetchData = spy();
      const records = [{
        'record': {},
        'candidate': {}
      }];

      instance = renderIntoDocument(
        <OfficerMerging deleteUnmergeable={ deleteUnmergeable } fetchData={ fetchData } records={ records }/>
      );
      const selectCandidateButton = findRenderedDOMComponentWithClass(instance, 'test--merge-button');

      Simulate.click(selectCandidateButton);
      deleteUnmergeable.called.should.be.true();
      deleteUnmergeable().then(function () {
        fetchData.called.should.be.true();
      });
    });
  });
});
