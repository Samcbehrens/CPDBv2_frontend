import { stub } from 'sinon';
import axios from 'axios';

import { EVENTS_API_URL } from 'utils/constants';
import {
  trackInternalEvent, trackOutboundLink
} from 'utils/tracking';


describe('tracking utils', function () {
  window.Intercom = function () {};
  let IntercomStub;

  beforeEach(function () {
    IntercomStub = stub(window, 'Intercom');
    stub(axios, 'post');
  });

  afterEach(function () {
    IntercomStub.restore();
    axios.post.restore();
  });

  describe('trackInternalEvent', function () {
    it('should post to events api', function () {
      trackInternalEvent('eventA', { a: 'b' });
      axios.post.calledOnce.should.be.true();
      axios.post.calledWith(EVENTS_API_URL, { name: 'eventA', data: { a: 'b' } }).should.be.true();
    });
  });

  describe('trackOutboundLink', function () {
    it('should send event analytic', function () {
      stub(global, 'ga');

      trackOutboundLink('localhost');

      const args = global.ga.getCall(0).args;
      args.slice(0, 5).should.eql(['send', 'event', 'outbound', 'click', 'localhost']);
      args[5].transport.should.equal('beacon');
      args[5].hitCallback.should.be.ok();
      global.ga.restore();
    });
  });
});
