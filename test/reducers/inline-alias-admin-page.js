import reducer from 'reducers/inline-alias-admin-page';

import {
  SET_ALIAS_ADMIN_PAGE_CONTENT,
  UPDATE_ALIAS_REQUEST_START,
  UPDATE_ALIAS_REQUEST_FAILURE
} from 'actions/inline-alias-admin-page';

describe('inlineAliasAdminPage reducer', function () {
  it('should return initial state', function () {
    reducer(undefined, {}).should.eql({});
  });

  it('should set alias admin page content', function () {
    reducer(undefined, {
      type: SET_ALIAS_ADMIN_PAGE_CONTENT,
      payload: {
        id: '123',
        type: 'officer',
        text: 'John Wayne',
        description: 'Badge #000',
        existingAliases: []
      }
    }).should.eql({
      id: '123',
      type: 'officer',
      text: 'John Wayne',
      description: 'Badge #000',
      existingAliases: [],
      errorMessage: ''
    });
  });

  it('should set errorMessage when "update alias" request fails', function () {
    reducer({
      foo: 'bar',
      errorMessage: ''
    }, {
      type: UPDATE_ALIAS_REQUEST_FAILURE,
      payload: {
        aliases: ['Alias too long']
      }
    }).should.eql({
      foo: 'bar',
      errorMessage: 'Alias too long'
    });
  });

  it('should empty errorMessage when "update alias" request starts', function () {
    reducer({
      foo: 'bar',
      errorMessage: 'Something went wrong'
    }, {
      type: UPDATE_ALIAS_REQUEST_START,
      payload: {}
    }).should.eql({
      foo: 'bar',
      errorMessage: ''
    });
  });
});
