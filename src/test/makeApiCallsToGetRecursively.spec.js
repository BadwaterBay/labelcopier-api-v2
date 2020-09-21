import { expect } from 'chai';

import { makeApiCallsToGetRecursively } from '../core/apiCalls';
import { dummyResponseBodyAll } from './dummyData/dummyResponseBodyOfListingLabels';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForGETOnSuccess,
  mockHttpServerForGETOnFailure,
} from './mockHttpServer';

describe('Test makeApiCallsToGetRecursively', function () {
  describe('with a mock HTTP server', function () {
    before(function () {
      mockHttpServerSetup();
    });

    after(function () {
      mockHttpServerCleanup();
    });

    describe('when simulated with failed HTTP responses', function () {
      beforeEach(function () {
        mockHttpServerForGETOnFailure();
      });
      describe("the return value with argument 'labels'", function () {
        const entryType = 'labels';
        const action = 'list';
        const failureStatusCode = 404;

        it('should throw an error', async function () {
          try {
            await makeApiCallsToGetRecursively(entryType, action);
          } catch (errorReceived) {
            expect(errorReceived).to.be.an('error');
          }
        });

        it(`should throw an error that has a status code of ${failureStatusCode}`, async function () {
          try {
            await makeApiCallsToGetRecursively(entryType, action);
          } catch (errorReceived) {
            const errorfailureStatusCode = errorReceived.status;
            expect(errorfailureStatusCode).to.deep.equal(failureStatusCode);
          }
        });
      });
    });

    describe('when simulated with successful HTTP responses', function () {
      beforeEach(function () {
        mockHttpServerForGETOnSuccess();
      });

      describe("the return value with argument 'labels'", function () {
        const entryType = 'labels';
        const action = 'list';
        const responseBodyAnswerKey = dummyResponseBodyAll;
        let responseBody;

        beforeEach(async function () {
          responseBody = await makeApiCallsToGetRecursively(entryType, action);
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
