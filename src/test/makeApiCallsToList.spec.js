import { expect } from 'chai';

import { makeApiCallToList } from '../core/apiCalls';
import { dummyResponseBodyAll } from './dummyData/dummyResponseBodyOfListingLabels';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForGETOnSuccess,
} from './mockHttpServer';

describe('Test makeApiCallToList', function () {
  describe('with a mock HTTP server', function () {
    before(function () {
      mockHttpServerSetup();
    });

    after(function () {
      mockHttpServerCleanup();
    });

    describe('when simulated with successful HTTP responses', function () {
      beforeEach(function () {
        mockHttpServerForGETOnSuccess();
      });

      describe("the return value with argument 'labels'", function () {
        const entryType = 'labels';
        const responseBodyAnswerKey = dummyResponseBodyAll;
        let responseBody;

        beforeEach(async function () {
          responseBody = await makeApiCallToList(entryType);
        });

        it('should be an array', function () {
          expect(responseBody).to.be.an('array');
        });

        it('should matches the expected value', function () {
          expect(responseBody).to.deep.equal(responseBodyAnswerKey);
        });
      });

      describe("the return value with argument 'milestones'", function () {
        const entryType = 'milestones';
        const responseBodyAnswerKey = dummyResponseBodyAll;
        let responseBody;

        beforeEach(async function () {
          responseBody = await makeApiCallToList(entryType);
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
