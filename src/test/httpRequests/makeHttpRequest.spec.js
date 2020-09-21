import { expect } from 'chai';
import nock from 'nock';

import { makeHttpRequest } from '../../core/httpRequests/httpRequestMaker';
import {
  getBaseApiUri,
  getBaseApiUriSlashRepos,
} from '../../core/httpRequests/httpRequestUriBuilder';

describe('Test makeHttpRequest', function () {
  const method = 'GET';
  let uriForHttpRequest;

  before(function () {
    uriForHttpRequest = getBaseApiUriSlashRepos();
    nock.disableNetConnect();
  });

  after(function () {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('when simulated with a network failure', function () {
    it('should throw an error', async function () {
      try {
        await makeHttpRequest(method, uriForHttpRequest);
      } catch (error) {
        const errorIsAnInstanceOfError = error instanceof Error;
        expect(errorIsAnInstanceOfError).to.be.true;
      }
    });

    it('should contain an expected error message', async function () {
      try {
        await makeHttpRequest(method, uriForHttpRequest);
      } catch (error) {
        const regex = /reason: Nock: Disallowed net connect/;
        expect(error.message).to.match(regex);
      }
    });
  });

  describe('when simulated with failed HTTP responses', function () {
    const statusCode = 404;

    beforeEach(function () {
      const mockHttpServer = nock(getBaseApiUri());
      mockHttpServer.get(/.*/).reply(statusCode);
    });

    it('should throw an error', async function () {
      try {
        await makeHttpRequest(method, uriForHttpRequest);
      } catch (errorReceived) {
        expect(errorReceived).to.be.an('error');
      }
    });

    it(`should throw an error that has a status code of ${statusCode}`, async function () {
      try {
        await makeHttpRequest(method, uriForHttpRequest);
      } catch (errorReceived) {
        const errorStatusCode = errorReceived.status;
        expect(errorStatusCode).to.deep.equal(statusCode);
      }
    });
  });
});
