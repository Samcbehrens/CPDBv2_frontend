import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test/index';
import PrintNotes from 'components/common/print-notes';
import MarkdownLink from 'components/common/markdown-renderers/markdown-link';


describe('PrintNotes component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render notes correctly', function () {
    const notes = [
      {
        page: 'complaint',
        title: 'Investigator',
        name: 'investigator',
        text: 'this is investigator note.',
      },
      {
        page: 'complaint',
        title: 'Accused Officer',
        name: 'accused officer',
        text: 'this is accused officer note.'
      }
    ];
    instance = renderIntoDocument(<PrintNotes notes={ notes }/>);
    findRenderedDOMComponentWithClass(instance, 'notes-title').textContent.should.eql('Notes');
    const noteContents = scryRenderedDOMComponentsWithClass(instance, 'notes-content');
    noteContents.should.have.length(2);
    noteContents[0].textContent.should.eql('Investigator: this is investigator note.');
    noteContents[1].textContent.should.eql('Accused Officer: this is accused officer note.');
  });

  it('should able to render markdown code', function () {
    const notes = [
      {
        name: 'force_category',
        page: 'trr',
        title: 'Force Category',
        text: 'See CPD\'s official [Use of Force Model]' +
          '(http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html)'
      },
      {
        name: 'type_of_force',
        page: 'trr',
        title: 'Type of Force',
        text: 'See CPD\'s official [Use of Force Model]' +
          '(http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html)'
      }
    ];
    instance = renderIntoDocument(<PrintNotes notes={ notes } />);
    findRenderedDOMComponentWithClass(instance, 'notes-title').textContent.should.eql('Notes');
    const noteContents = scryRenderedDOMComponentsWithClass(instance, 'notes-content');
    noteContents.should.have.length(2);
    noteContents[0].textContent.should.eql('Force Category: See CPD\'s official Use of Force Model');
    noteContents[1].textContent.should.eql('Type of Force: See CPD\'s official Use of Force Model');

    const noteContentMarkdownLinks = scryRenderedComponentsWithType(instance, MarkdownLink).map(findDOMNode);
    noteContentMarkdownLinks.should.have.length(2);
    noteContentMarkdownLinks[0].textContent.should.eql('Use of Force Model');
    noteContentMarkdownLinks[0].href.should.eql(
      'http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html'
    );
    noteContentMarkdownLinks[1].textContent.should.eql('Use of Force Model');
    noteContentMarkdownLinks[1].href.should.eql(
      'http://directives.chicagopolice.org/directives/data/a7a57be2-128ff3f0-ae912-8fff-cec11383d806e05f.html'
    );
  });

  it('should render into two columns if notes is greater than 4', function () {
    let notes = [
      {
        page: 'officer',
        title: 'Salary',
        name: 'salary',
        text: 'this is salary note.',
      },
      {
        page: 'officer',
        title: 'trr',
        name: 'trr',
        text: 'this is trr note.'
      },
      {
        page: 'officer',
        title: 'trr',
        name: 'trr',
        text: 'this is trr note.'
      },
      {
        page: 'officer',
        title: 'Sustained',
        name: 'sustained',
        text: 'this is sustained note.'
      },
      {
        page: 'officer',
        title: 'Allegation',
        name: 'allegation',
        text: 'this is allegation note.'
      },
      {
        page: 'officer',
        title: 'Major Award',
        name: 'major_award',
        text: 'this is major award note.'
      }
    ];
    instance = renderIntoDocument(<PrintNotes notes={ notes }/>);
    scryRenderedDOMComponentsWithClass(instance, 'notes-column').should.have.length(2);
    scryRenderedDOMComponentsWithClass(instance, 'notes-content').should.have.length(6);
  });
});
