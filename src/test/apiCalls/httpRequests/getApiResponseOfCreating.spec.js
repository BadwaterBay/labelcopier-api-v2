import { expect } from 'chai';

import { buildAcceptHeaderForHttpRequest } from '../../../core/apiCalls/httpRequests/httpRequestHeaderBuilder';
import { getApiResponseOfCreating } from '../../../core/apiCalls/apiResponseGetter';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForPOSTOnSuccess,
} from '../../mockHttpServer';
import { getDummyNewLabel } from '../../dummyData/dummyLabel.setup.test';
import { getDummyLoginInfo } from '../../dummyData/dummyLoginInfo.setup.test';

describe('Test getApiResponseOfCreating', function () {
  let loginInfo;
  let dummyLabel;

  before(function () {
    mockHttpServerSetup();
    loginInfo = getDummyLoginInfo();
    dummyLabel = getDummyNewLabel();
  });

  after(function () {
    mockHttpServerCleanup();
  });

  describe('with HTTP responses on success', function () {
    let body;

    describe('the HTTP request sent', function () {
      beforeEach(async function () {
        mockHttpServerForPOSTOnSuccess();
        body = await getApiResponseOfCreating(loginInfo, 'labels', dummyLabel);
      });

      describe('the HTTP request sent', function () {
        it('should have used the HTTP POST method', function () {
          const acceptHeaderSent = body.method;
          const answerKey = 'POST';
          expect(acceptHeaderSent).to.deep.equal(answerKey);
        });

        it('should have sent the correct HTTP Accept header', function () {
          const httpMethodUsed = body.requestHeader.accept[0];
          const answerKey = buildAcceptHeaderForHttpRequest();
          expect(httpMethodUsed).to.deep.equal(answerKey);
        });

        it('should have sent the HTTP body as a string', function () {
          const requestBodySent = body.requestBody;
          expect(requestBodySent).to.be.a('string');
        });
      });
    });
  });
});
