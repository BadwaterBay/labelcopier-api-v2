import { expect } from 'chai';

import { makeApiCallToCreate } from '../core/communicationsWithApi';
import { dummyLabel as dummyRequestBody } from './dummyData/dummyLabel.setup.test';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForCreationOnSuccess,
  mockHttpServerForCreationOnFailure,
} from './mockHttpServer';

describe('Test makeApiCallToCreate', function () {
  describe('with a mock HTTP server', function () {
    before(function () {
      mockHttpServerSetup();
    });

    after(function () {
      mockHttpServerCleanup();
    });

    describe('with HTTP responses on failure', function () {
      const entryType = 'labels';
      const failureStatusCode = 403;

      beforeEach(function () {
        mockHttpServerForCreationOnFailure();
      });

      it('should throw an error', async function () {
        try {
          await makeApiCallToCreate(entryType);
        } catch (errorReceived) {
          expect(errorReceived).to.be.an('error');
        }
      });

      it(`should throw an error that has a status code of ${failureStatusCode}`, async function () {
        try {
          await makeApiCallToCreate(entryType);
        } catch (errorReceived) {
          const errorStatusCode = errorReceived.status;
          expect(errorStatusCode).to.deep.equal(failureStatusCode);
        }
      });
    });

    describe('with HTTP responses on success', function () {
      const entryType = 'labels';
      let responseBody;

      beforeEach(async function () {
        mockHttpServerForCreationOnSuccess();

        responseBody = await makeApiCallToCreate(entryType, dummyRequestBody);
      });

      describe('in the received response', function () {
        describe("a key-value pair with key 'name'", function () {
          const key = 'name';

          it('key should exist', function () {
            const keyExists = key in responseBody;
            expect(keyExists).to.be.true;
          });

          it('its value should match the expected value', function () {
            const receivedValue = responseBody[key];
            const answerKey = dummyRequestBody[key];
            expect(receivedValue).to.deep.equal(answerKey);
          });
        });

        describe("a key-value pair with key 'color'", function () {
          const key = 'color';

          it('key should exist', function () {
            const keyExists = key in responseBody;
            expect(keyExists).to.be.true;
          });

          it('its value should match the expected value', function () {
            const receivedValue = responseBody[key];
            const answerKey = dummyRequestBody[key];
            expect(receivedValue).to.deep.equal(answerKey);
          });
        });

        describe("a key-value pair with key 'description'", function () {
          const key = 'description';

          it('key should exist', function () {
            const keyExists = key in responseBody;
            expect(keyExists).to.be.true;
          });

          it('its value should match the expected value', function () {
            const receivedValue = responseBody[key];
            const answerKey = dummyRequestBody[key];
            expect(receivedValue).to.deep.equal(answerKey);
          });
        });
      });
    });
  });
});
