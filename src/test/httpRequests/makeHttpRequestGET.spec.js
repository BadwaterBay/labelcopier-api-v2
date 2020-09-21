import { expect } from 'chai';
import nock from 'nock';

import { buildAcceptHeaderForHttpRequest } from '../../core/httpRequests/httpRequestHeaderBuilder';
import { makeHttpRequestGET } from '../../core/httpRequests/httpRequestMaker';
import {
  getBaseApiUri,
  getBaseApiUriSlashRepos,
} from '../../core/httpRequests/httpRequestUriBuilder';

describe('Test makeHttpRequestGET', function () {
  let uriForHttpGet;

  before(function () {
    uriForHttpGet = getBaseApiUriSlashRepos();
    nock.disableNetConnect();
  });

  after(function () {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('when simulated with successful HTTP responses', function () {
    const statusCode = 200;
    let response;

    beforeEach(async function () {
      const mockHttpServer = nock(getBaseApiUri());
      mockHttpServer.get(/.*/).reply(statusCode, function (uri) {
        return {
          requestUri: uri,
          method: this.req.method,
          requestHeader: this.req.headers,
        };
      });

      response = await makeHttpRequestGET(uriForHttpGet);
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
