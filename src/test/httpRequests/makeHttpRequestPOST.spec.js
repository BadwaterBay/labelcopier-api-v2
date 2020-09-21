import { expect } from 'chai';
import nock from 'nock';

import { buildAcceptHeaderForHttpRequest } from '../../core/httpRequests/httpRequestHeaderBuilder';
import { makeHttpRequestPOST } from '../../core/httpRequests/httpRequestMaker';
import {
  getBaseApiUri,
  getBaseApiUriSlashRepos,
} from '../../core/httpRequests/httpRequestUriBuilder';

describe('Test makeHttpRequestPOST', function () {
  let uriForHttpPost;

  before(function () {
    uriForHttpPost = getBaseApiUriSlashRepos();
    nock.disableNetConnect();
  });

  after(function () {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('when simulated with successful HTTP responses', function () {
    const statusCode = 201;
    let response;

    describe('the HTTP request sent', function () {
      beforeEach(async function () {
        const mockHttpServer = nock(getBaseApiUri());
        mockHttpServer.post(/\/.*/).reply(statusCode, function (uri, requestBody) {
          return {
            requestUri: uri,
            method: this.req.method,
            requestHeader: this.req.headers,
            requestBody,
          };
        });

        response = await makeHttpRequestPOST(uriForHttpPost);
      });

      it('should receive an OK status', async function () {
        const okStatus = response.ok;
        expect(okStatus).to.be.true;
      });

      describe('the HTTP request sent', function () {
        let body;

        before(async function () {
          body = await response.json();
        });

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
