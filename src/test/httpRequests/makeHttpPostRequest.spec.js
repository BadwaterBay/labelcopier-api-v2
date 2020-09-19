import { expect } from 'chai';
import nock from 'nock';

import { httpAcceptHeader } from '../../core/httpRequests/httpRequestHeaderBuilder';
import { makeHttpPostRequest } from '../../core/httpRequests/httpRequestMaker';
import {
  apiUriBase,
  apiUriBaseRepos,
} from '../../core/httpRequests/httpRequestUriBuilder';

describe('Test makeHttpPostRequest', function () {
  const uriForHttpPost = apiUriBaseRepos;

  before(function () {
    nock.disableNetConnect();
  });

  after(function () {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('when simulated with a network failure', function () {
    it('should throw an error', async function () {
      try {
        await makeHttpPostRequest(uriForHttpPost);
      } catch (error) {
        const errorIsAnInstanceOfError = error instanceof Error;
        expect(errorIsAnInstanceOfError).to.be.true;
      }
    });

    it('should contain an expected error message', async function () {
      try {
        await makeHttpPostRequest(uriForHttpPost);
      } catch (error) {
        const regex = /reason: Nock: Disallowed net connect/;
        expect(error.message).to.match(regex);
      }
    });
  });

  describe('when simulated with failed HTTP responses', function () {
    const statusCode = 403;

    beforeEach(function () {
      const mockHttpServer = nock(apiUriBase);
      mockHttpServer.post(/.*/).reply(statusCode);
    });

    it('should throw an error', async function () {
      try {
        await makeHttpPostRequest(uriForHttpPost);
      } catch (errorReceived) {
        expect(errorReceived).to.be.an('error');
      }
    });

    it(`should throw an error that has a status code of ${statusCode}`, async function () {
      try {
        await makeHttpPostRequest(uriForHttpPost);
      } catch (errorReceived) {
        const errorStatusCode = errorReceived.status;
        expect(errorStatusCode).to.deep.equal(statusCode);
      }
    });
  });

  describe('when simulated with successful HTTP responses', function () {
    const statusCode = 201;
    let response;

    beforeEach(async function () {
      const mockHttpServer = nock(apiUriBase);
      mockHttpServer.post(/\/.*/).reply(statusCode, function (uri, requestBody) {
        return {
          requestUri: uri,
          method: this.req.method,
          requestHeader: this.req.headers,
          requestBody,
        };
      });

      response = await makeHttpPostRequest(uriForHttpPost);
    });

    it('should receive an OK status', async function () {
      const okStatus = response.ok;
      expect(okStatus).to.be.true;
    });

    describe('the parsed response body', function () {
      let responseBody;

      before(async function () {
        responseBody = await response.json();
      });

      it('should have used the HTTP POST method', function () {
        const acceptHeaderSent = responseBody.method;
        const answerKey = 'POST';
        expect(acceptHeaderSent).to.deep.equal(answerKey);
      });

      it('should have sent the correct HTTP Accept header', function () {
        const httpMethodUsed = responseBody.requestHeader.accept[0];
        const answerKey = httpAcceptHeader;
        expect(httpMethodUsed).to.deep.equal(answerKey);
      });

      it('should have sent the HTTP body as a string', function () {
        const requestBodySent = responseBody.requestBody;
        expect(requestBodySent).to.be.a('string');
      });
    });
  });
});
