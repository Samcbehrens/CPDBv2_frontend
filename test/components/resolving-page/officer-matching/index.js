import React from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass, Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';


import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import CaretPrevious from 'grommet/components/icons/base/CaretPrevious';
import CaretNext from 'grommet/components/icons/base/CaretNext';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerMatching from 'components/resolving-page/officer-matching';
import OfficerForm from 'components/resolving-page/officer-form';



describe('OfficerMatching component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render title and search box', function () {
    instance = renderIntoDocument(<OfficerMatching />);

    scryRenderedComponentsWithType(instance, Title).should.have.length(1);
    scryRenderedComponentsWithType(instance, Search).should.have.length(1);
  });

  it('should render record', function () {
    const record = {};

    instance = renderIntoDocument(<OfficerMatching record={ record }/>);
    const officerForms = scryRenderedComponentsWithType(instance, OfficerForm);
    officerForms.should.have.length(1);
    officerForms[0].props.officer.should.eql(record);
  });

  it('should render list of candidates', function () {
    const candidate = {};

    instance = renderIntoDocument(<OfficerMatching candidates={ [candidate] } />);
    const officerForms = scryRenderedComponentsWithType(instance, OfficerForm);
    officerForms.should.have.length(2);
    officerForms[1].props.officer.should.eql(candidate);
  });

  it('should fetch unmatchable data on component did mount', function () {
    const fetchUnmatchable = spy();

    instance = renderIntoDocument(<OfficerMatching fetchUnmatchable={ fetchUnmatchable } />);
    fetchUnmatchable.called.should.be.true();
  });

  it('should handle when we click on next record button', function () {
    const fetchUnmatchable = spy();
    const nextUrl = 'nextUrl';

    instance = renderIntoDocument(<OfficerMatching fetchUnmatchable={ fetchUnmatchable } nextUrl={ nextUrl } />);
    const nextButton = findRenderedComponentWithType(instance, CaretNext);

    Simulate.click(nextButton);

    fetchUnmatchable.calledWith(nextUrl).should.be.true();
  });

  it('should handle when we click on previous record button', function () {
    const fetchUnmatchable = spy();
    const prevUrl = 'prevUrl';

    instance = renderIntoDocument(<OfficerMatching fetchUnmatchable={ fetchUnmatchable } prevUrl={ prevUrl } />);
    const prevButton = findRenderedComponentWithType(instance, CaretPrevious);

    Simulate.click(prevButton);
    fetchUnmatchable.calledWith(prevUrl).should.be.true();
  });

  describe('select candidate', function () {
    it('should fetch unmatchable data of next record if next url does exist', function () {

    });

    it('should fetch unmatchable data by default record if next url does not exist', function () {

    });
  });
});
