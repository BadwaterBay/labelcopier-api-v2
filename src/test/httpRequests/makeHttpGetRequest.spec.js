import { expect } from 'chai';
import nock from 'nock';

import { httpAcceptHeader } from '../../core/httpRequests/httpRequestHeaderBuilder';
import { makeHttpGetRequest } from '../../core/httpRequests/httpRequestMaker';
import {
  apiUriBase,
  apiUriBaseRepos,
} from '../../core/httpRequests/httpRequestUriBuilder';

describe('Test makeHttpGetRequest', function () {
  const uriForHttpGet = apiUriBaseRepos;

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
        await makeHttpGetRequest(uriForHttpGet);
      } catch (error) {
        const errorIsAnInstanceOfError = error instanceof Error;
        expect(errorIsAnInstanceOfError).to.be.true;
      }
    });

    it('should contain an expected error message', async function () {
      try {
        await makeHttpGetRequest(uriForHttpGet);
      } catch (error) {
        const regex = /reason: Nock: Disallowed net connect/;
        expect(error.message).to.match(regex);
      }
    });
  });

  describe('when simulated with failed HTTP responses', function () {
    const statusCode = 404;

    beforeEach(function () {
      const mockHttpServer = nock(apiUriBase);
      mockHttpServer.get(/.*/).reply(statusCode);
    });

    it('should throw an error', async function () {
      try {
        await makeHttpGetRequest(uriForHttpGet);
      } catch (errorReceived) {
        expect(errorReceived).to.be.an('error');
      }
    });

    it(`should throw an error that has a status code of ${statusCode}`, async function () {
      try {
        await makeHttpGetRequest(uriForHttpGet);
      } catch (errorReceived) {
        const errorStatusCode = errorReceived.status;
        expect(errorStatusCode).to.deep.equal(statusCode);
      }
    });
  });

  describe('when simulated with successful HTTP responses', function () {
    const statusCode = 200;
    let response;

    beforeEach(async function () {
      const mockHttpServer = nock(apiUriBase);
      mockHttpServer.get(/.*/).reply(statusCode, function (uri) {
        return {
          requestUri: uri,
          method: this.req.method,
          requestHeader: this.req.headers,
        };
      });

      response = await makeHttpGetRequest(uriForHttpGet);
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
        const answerKey = httpAcceptHeader;
        expect(acceptHeaderSent).to.deep.equal(answerKey);
      });
    });
  });
});
