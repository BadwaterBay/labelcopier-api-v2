import { expect } from 'chai';

import { getResponseOfHttpGETFromPaginatedApi } from '../../../core/apiCalls/httpRequests/httpRequestResponseGetter';
import { dummyResponseBodyAll } from '../../dummyData/dummyResponseBodyOfListingLabels.setup.test';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForListingOnSuccess,
  mockHttpServerForListingOnFailure,
} from '../../mockHttpServer';

describe('Test getResponseOfHttpGETFromPaginatedApi', function () {
  describe('with a mock HTTP server', function () {
    before(function () {
      mockHttpServerSetup();
    });

    after(function () {
      mockHttpServerCleanup();
    });

    describe('with HTTP responses on failure', function () {
      beforeEach(function () {
        mockHttpServerForListingOnFailure();
      });

      describe("the return value with argument 'labels'", function () {
        const entryType = 'labels';
        const action = 'list';
        const failureStatusCode = 404;

        it('should throw an error', async function () {
          try {
            await getResponseOfHttpGETFromPaginatedApi(entryType, action);
          } catch (errorReceived) {
            expect(errorReceived).to.be.an('error');
          }
        });

        it(`should throw an error that has a status code of ${failureStatusCode}`, async function () {
          try {
            await getResponseOfHttpGETFromPaginatedApi(entryType, action);
          } catch (errorReceived) {
            const errorfailureStatusCode = errorReceived.status;
            expect(errorfailureStatusCode).to.deep.equal(failureStatusCode);
          }
        });
      });
    });

    describe('with HTTP responses on success', function () {
      beforeEach(function () {
        mockHttpServerForListingOnSuccess();
      });

      describe("the return value with argument 'labels'", function () {
        const entryType = 'labels';
        const action = 'list';
        const responseBodyAnswerKey = dummyResponseBodyAll;
        let responseBody;

        beforeEach(async function () {
          responseBody = await getResponseOfHttpGETFromPaginatedApi(entryType, action);
        });

        it('should be an array', function () {
          expect(responseBody).to.be.an('array');
        });

        it('should matches the expected value', function () {
          expect(responseBody).to.deep.equal(responseBodyAnswerKey);
        });
      });
    });
  });
});
