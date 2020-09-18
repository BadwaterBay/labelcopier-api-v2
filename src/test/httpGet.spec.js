import { expect } from 'chai';
import nock from 'nock';

import { httpAcceptHeader, apiUriBase, apiUriBaseRepos } from '../core/apiCallOptions';
import { httpGet } from '../core/apiCallToGet';

describe('Test httpGet', function () {
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
        await httpGet(uriForHttpGet);
      } catch (error) {
        const errorIsAnInstanceOfError = error instanceof Error;
        expect(errorIsAnInstanceOfError).to.be.true;
      }
    });

    it('should contain an expected error message', async function () {
      try {
        await httpGet(uriForHttpGet);
      } catch (error) {
        const regex = /reason: Nock: Disallowed net connect/;
        expect(error.message).to.match(regex);
      }
    });
  });

  describe('when simulated with successful HTTP responses', function () {
    let response;

    beforeEach(async function () {
      const mockHttpServer = nock(apiUriBase);
      mockHttpServer.get(/.*/).reply(200, function (uri) {
        return {
          requestUri: uri,
          method: this.req.method,
          requestHeader: this.req.headers,
        };
      });

      response = await httpGet(uriForHttpGet);
    });

    it('should receives an OK status', async function () {
      const okStatus = response.ok;
      expect(okStatus).to.be.true;
    });

    describe('the parsed response body', function () {
      let responseBody;

      beforeEach(async function () {
        responseBody = await response.json();
      });

      it('should have used the HTTP GET method', function () {
        const httpMethodUsed = responseBody.method;
        const answerKey = 'GET';
        expect(httpMethodUsed).to.deep.equal(answerKey);
      });

      it('should have sent the correct HTTP Accept header', function () {
        const acceptHeaderSent = responseBody.requestHeader.accept[0];
        const answerKey = httpAcceptHeader;
        expect(acceptHeaderSent).to.deep.equal(answerKey);
      });
    });
  });
});
