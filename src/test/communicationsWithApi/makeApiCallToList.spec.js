import { expect } from 'chai';

import { makeApiCallToList } from '../../core/communicationsWithApi';
import { dummyResponseBodyAll } from '../dummyData/dummyResponseBodyOfListingLabels.setup.test';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForListingOnSuccess,
} from '../mockHttpServer';
import { getDummyLoginInfo } from '../dummyData/dummyLoginInfo.setup.test';

describe('Test makeApiCallToList', function () {
  describe('with a mock HTTP server', function () {
    let loginInfo;

    before(function () {
      mockHttpServerSetup();
      loginInfo = getDummyLoginInfo();
    });

    after(function () {
      mockHttpServerCleanup();
    });

    describe('with HTTP responses on success', function () {
      beforeEach(function () {
        mockHttpServerForListingOnSuccess();
      });

      describe("the return value with argument 'labels'", function () {
        const entryType = 'labels';
        const responseBodyAnswerKey = dummyResponseBodyAll;
        let responseBody;

        beforeEach(async function () {
          responseBody = await makeApiCallToList(loginInfo, entryType);
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
          responseBody = await makeApiCallToList(loginInfo, entryType);
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
