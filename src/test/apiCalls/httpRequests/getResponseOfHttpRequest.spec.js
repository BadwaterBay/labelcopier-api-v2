import { expect } from 'chai';

import { getResponseOfHttpRequest } from '../../../core/apiCalls/httpRequests/httpRequestResponseGetter';
import { getBaseApiUriSlashRepos } from '../../../core/apiCalls/httpRequests/httpRequestUriBuilder';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForListingOnFailure,
} from '../../mockHttpServer';

describe('Test getResponseOfHttpRequest', function () {
  const method = 'GET';
  let uriForHttpRequest;

  before(function () {
    mockHttpServerSetup();
    uriForHttpRequest = getBaseApiUriSlashRepos();
  });

  after(function () {
    mockHttpServerCleanup();
  });

  describe('with a network failure', function () {
    it('should throw an error', async function () {
      try {
        await getResponseOfHttpRequest(method, uriForHttpRequest);
      } catch (error) {
        const errorIsAnInstanceOfError = error instanceof Error;
        expect(errorIsAnInstanceOfError).to.be.true;
      }
    });

    it('should contain an expected error message', async function () {
      try {
        await getResponseOfHttpRequest(method, uriForHttpRequest);
      } catch (error) {
        const regex = /reason: Nock: Disallowed net connect/;
        expect(error.message).to.match(regex);
      }
    });
  });

  describe('with HTTP responses on failure', function () {
    const statusCode = 404;

    beforeEach(function () {
      mockHttpServerForListingOnFailure();
    });

    it('should throw an error', async function () {
      try {
        await getResponseOfHttpRequest(method, uriForHttpRequest);
      } catch (errorReceived) {
        expect(errorReceived).to.be.an('error');
      }
    });

    it(`should throw an error that has a status code of ${statusCode}`, async function () {
      try {
        await getResponseOfHttpRequest(method, uriForHttpRequest);
      } catch (errorReceived) {
        const errorStatusCode = errorReceived.status;
        expect(errorStatusCode).to.deep.equal(statusCode);
      }
    });
  });
});
