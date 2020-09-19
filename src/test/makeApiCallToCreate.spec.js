import { expect } from 'chai';
import nock from 'nock';

import { apiUriBase } from '../core/apiCallOptions';
import { makeApiCallToCreate } from '../core/apiCallToCreate';

describe('Test makeApiCallToCreate', function () {
  describe('with a mock HTTP server', function () {
    before(function () {
      nock.disableNetConnect();
    });

    after(function () {
      nock.cleanAll();
      nock.enableNetConnect();
    });

    describe('when simulated with failed HTTP responses', function () {
      const statusCode = 403;

      beforeEach(function () {
        const mockHttpServer = nock(apiUriBase);
        mockHttpServer.post(/.*/).reply(statusCode);
      });

      it('should throw an error', async function () {
        try {
          await makeApiCallToCreate();
        } catch (errorReceived) {
          expect(errorReceived).to.be.an('error');
        }
      });

      it(`should throw an error that has a status code of ${statusCode}`, async function () {
        try {
          await makeApiCallToCreate();
        } catch (errorReceived) {
          const errorStatusCode = errorReceived.status;
          expect(errorStatusCode).to.deep.equal(statusCode);
        }
      });
    });

    describe('when simulated with successful HTTP responses', function () {
      const statusCode = 201;

      beforeEach(function () {
        const mockHttpServer = nock(apiUriBase);
        mockHttpServer.post(/.*/).reply(statusCode, {});
      });

      it('should not throw an error', function () {
        expect(() => makeApiCallToCreate()).to.not.throw();
      });

      describe('the return value', function () {
        const kind = 'labels';
        let responseBody;

        it('should be an array', async function () {
          responseBody = await makeApiCallToCreate(kind);
          expect(responseBody).to.be.an('object');
        });
      });
    });
  });
});
