import { expect } from 'chai';

import { buildAcceptHeaderForHttpRequest } from '../../../core/apiCalls/httpRequests/httpRequestHeaderBuilder';
import { getApiResponseOfCreating } from '../../../core/apiCalls/apiResponseGetter';
import { getBaseApiUriSlashRepos } from '../../../core/apiCalls/httpRequests/httpRequestUriBuilder';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForPOSTOnSuccess,
} from '../../mockHttpServer';

describe('Test getApiResponseOfCreating', function () {
  let uriForHttpPost;

  before(function () {
    mockHttpServerSetup();
    uriForHttpPost = getBaseApiUriSlashRepos();
  });

  after(function () {
    mockHttpServerCleanup();
  });

  describe('with HTTP responses on success', function () {
    let body;
    // let response;

    describe('the HTTP request sent', function () {
      beforeEach(async function () {
        mockHttpServerForPOSTOnSuccess();

        body = await getApiResponseOfCreating(uriForHttpPost, {});
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
