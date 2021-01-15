import { expect } from 'chai';

import { buildAcceptHeaderForHttpRequest } from '../../../../core/apiCalls/httpRequests/httpRequestHeaderBuilder';
import { getResponseOfHttpGET } from '../../../../core/apiCalls/httpRequests/httpRequestResponseGetter';
import { getBaseApiUriSlashRepos } from '../../../../core/apiCalls/httpRequests/httpRequestUriBuilder';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForGETOnSuccess,
} from '../../../mockHttpServer';
import { getDummyLoginInfo } from '../../../dummyData/dummyLoginInfo.setup.test';

describe('Test getResponseOfHttpGET', function () {
  let loginInfo;
  let uriForHttpGet;
  const entryType = 'labels';
  const action = 'list';

  before(function () {
    mockHttpServerSetup();
    loginInfo = getDummyLoginInfo();
    uriForHttpGet = getBaseApiUriSlashRepos();
  });

  after(function () {
    mockHttpServerCleanup();
  });

  describe('with HTTP responses on success', function () {
    let response;

    beforeEach(async function () {
      mockHttpServerForGETOnSuccess();
      response = await getResponseOfHttpGET(loginInfo, entryType, action, uriForHttpGet);
    });

    it('should receives an OK status', async function () {
      const okStatus = response.ok;
      expect(okStatus).to.be.true;
    });

    describe('the parsed response body', function () {
      let body;

      beforeEach(async function () {
        body = await response.json();
      });

      it('should have used the HTTP GET method', function () {
        const httpMethodUsed = body.method;
        const answerKey = 'GET';
        expect(httpMethodUsed).to.deep.equal(answerKey);
      });

      it('should have sent the correct HTTP Accept header', function () {
        const acceptHeaderSent = body.requestHeader.accept[0];
        const answerKey = buildAcceptHeaderForHttpRequest();
        expect(acceptHeaderSent).to.deep.equal(answerKey);
      });
    });
  });
});
