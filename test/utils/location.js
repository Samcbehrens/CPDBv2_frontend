import should from 'should';

import {
  getOfficerId,
  hasOfficerIdChanged,
  getCRID,
  getComplaintOfficerId,
  getOfficerActiveTab,
  isSameOfficerPath,
  isSameCR,
  isRedirectingToOfficerTimelinePage,
  serializeFilterParams
} from 'utils/location';


describe('location utils', function () {
  describe('getOfficerId', function () {
    it('should return the officer id', function () {
      getOfficerId('/officer/10/').should.eql(10);
    });

    it('should return NaN if wrong url was given', function () {
      isNaN(getOfficerId('foo')).should.be.true();
    });
  });

  describe('hasOfficerIdChanged', function () {
    const locationChangeAction = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/officer/1/'
      }
    };
    it('should return true if location and officer id changed', function () {
      hasOfficerIdChanged(locationChangeAction, 2).should.be.true();
    });

    it('should return false if officer id not changed', function () {
      hasOfficerIdChanged(locationChangeAction, 1).should.be.false();
    });

    it('should return false if not @@router/LOCATION_CHANGE action', function () {
      hasOfficerIdChanged({
        type: 'ANY'
      }, 2).should.be.false();
    });

    it('should return false if @@router/LOCATION_CHANGE action and wrong url', function () {
      hasOfficerIdChanged({
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/foo/2/'
        }
      }, 2).should.be.false();
    });
  });

  describe('getCRID', function () {
    it('should return NaN when url is undefined', function () {
      getCRID(undefined).should.be.NaN();
    });

    it('should return crid', function () {
      getCRID('/complaint/123/').should.eql(123);
    });
  });

  describe('getComplaintOfficerId', function () {
    it('should return NaN when url is undefined', function () {
      getComplaintOfficerId(undefined).should.be.NaN();
    });

    it('should return complaint officer id', function () {
      getComplaintOfficerId('/complaint/123/456').should.eql(456);
    });
  });

  describe('getOfficerActiveTab', function () {
    it('should return null when url is not an officer path', function () {
      should.not.exist(getOfficerActiveTab('/some/incorrect/path/'));
    });

    it('should return officer active tab', function () {
      getOfficerActiveTab('/officer/123/timeline/').should.eql('timeline');
      getOfficerActiveTab('/officer/123/social/').should.eql('social');
      getOfficerActiveTab('/officer/123/').should.eql('');
    });
  });

  describe('isSameOfficerPath', function () {
    it('should return false when an argument is not an officer path', function () {
      isSameOfficerPath('/some/incorrect/path/', '/officer/1/').should.be.false();
      isSameOfficerPath('/officer/1/', '/some/incorrect/path/').should.be.false();
    });

    it('should return flase when officer ids do not match', function () {
      isSameOfficerPath('/officer/123/', '/officer/456/').should.be.false();
    });

    it('should return true when officer ids match', function () {
      isSameOfficerPath('/officer/123/', '/officer/123/').should.be.true();
    });
  });

  describe('isSameCR', function () {
    it('should return false when an argument is not an complaint path', function () {
      isSameCR('/some/incorrect/path/', '/complaint/1/').should.be.false();
      isSameCR('/complaint/1/', '/some/incorrect/path/').should.be.false();
    });

    it('should return flase when complaint ids do not match', function () {
      isSameCR('/complaint/123/', '/complaint/456/').should.be.false();
    });

    it('should return true when complaint ids match', function () {
      isSameCR('/complaint/123/', '/complaint/123/').should.be.true();
    });
  });

  describe('isRedirectingToOfficerTimelinePage', function () {

    it('should return true if @@router/LOCATION_CHANGE action and current page is Officer Timeline', function () {
      isRedirectingToOfficerTimelinePage({
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/officer/1/timeline/'
        }
      }).should.be.true();
    });

    it('should return false if @@router/LOCATION_CHANGE action and wrong url', function () {
      isRedirectingToOfficerTimelinePage({
        type: '@@router/LOCATION_CHANGE',
        payload: {
          pathname: '/foo/2/'
        }
      }).should.be.false();
    });

    it('should return false if get another action', function () {
      isRedirectingToOfficerTimelinePage({
        type: 'SOME ACTION',
        payload: {
          pathname: '/officer/1/timeline/'
        }
      }).should.be.false();
    });
  });

  describe('serializeFilterParams', function () {

    it('should return object params to url string', function () {
      serializeFilterParams({
        'age': '51+',
        'category': 'Illegal Search'
      }).should.eql('age=51%2B&category=Illegal%20Search');

      serializeFilterParams({
        'age': '41-50',
        'category': 'Illegal Search'
      }, '?').should.eql('?age=41-50&category=Illegal%20Search');
    });
  });
});
