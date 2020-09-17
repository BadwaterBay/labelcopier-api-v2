import { expect } from 'chai';
import nock from 'nock';

import { httpUriBase } from '../core/apiCallOptions';
import { makeApiCallToListEntries } from '../core/apiCallToList';

import mockHttpResponse from './dummyResponseBodyOfListingLabels';

describe('Test makeApiCallToListEntries', function () {
  describe('when the function is called with mocking HTTP server', function () {
    before(function () {
      nock.disableNetConnect();
    });

    beforeEach(function () {
      nock(httpUriBase).get(/\/.*/).reply(200, mockHttpResponse);
    });

    after(function () {
      nock.cleanAll();
      nock.enableNetConnect();
    });

    it('should not throw an error', function () {
      expect(() => makeApiCallToListEntries()).to.not.throw();
    });

    describe('the return value', function () {
      it('should be an array', async function () {
        const responseBody = await makeApiCallToListEntries();
        expect(responseBody).to.be.an('array');
      });

      it('should match the expected value', async function () {
        const answerKey = mockHttpResponse;
        const responseBody = await makeApiCallToListEntries();
        expect(responseBody).to.deep.equal(answerKey);
      });
    });
  });
});
