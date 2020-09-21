import { expect } from 'chai';

import { buildAcceptHeaderForHttpRequest } from '../../core/httpRequests/httpRequestHeaderBuilder';
import { getResponseOfHttpPOST } from '../../core/httpRequests/httpRequestResponseGetter';
import { getBaseApiUriSlashRepos } from '../../core/httpRequests/httpRequestUriBuilder';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForPOSTOnSuccess,
} from '../mockHttpServer';

describe('Test getResponseOfHttpPOST', function () {
  let uriForHttpPost;

  before(function () {
    mockHttpServerSetup();
    uriForHttpPost = getBaseApiUriSlashRepos();
  });

  after(function () {
    mockHttpServerCleanup();
  });

  describe('with HTTP responses on success', function () {
    let response;

    describe('the HTTP request sent', function () {
      beforeEach(async function () {
        mockHttpServerForPOSTOnSuccess();

        response = await getResponseOfHttpPOST(uriForHttpPost);
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
