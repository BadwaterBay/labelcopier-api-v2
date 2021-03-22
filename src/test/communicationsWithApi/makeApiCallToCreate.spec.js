import { expect } from 'chai';

import { makeApiCallToCreate } from '../../core/communicationsWithApi';
import {
  mockHttpServerSetup,
  mockHttpServerCleanup,
  mockHttpServerForCreationOnSuccess,
} from '../mockHttpServer';
import { getDummyNewLabel } from '../dummyData/dummyLabel.setup.test';
import { getDummyLoginInfo } from '../dummyData/dummyLoginInfo.setup.test';

describe('Test makeApiCallToCreate', function () {
  describe('with a mock HTTP server', function () {
    let loginInfo;

    before(function () {
      mockHttpServerSetup();
      loginInfo = getDummyLoginInfo();
    });

    after(function () {
      mockHttpServerCleanup();
    });

    describe('with HTTP responses on failure', function () {
      const entryType = 'labels';

      it('should throw an error', async function () {
        try {
          await makeApiCallToCreate(loginInfo, entryType, {});
        } catch (errorReceived) {
          expect(errorReceived).to.be.an('error');
        }
      });
    });

    describe('with HTTP responses on success', function () {
      const entryType = 'labels';
      let responseBody;
      let dummyRequestBody;

      before(function () {
        dummyRequestBody = getDummyNewLabel();
      });

      beforeEach(async function () {
        mockHttpServerForCreationOnSuccess();
        responseBody = await makeApiCallToCreate(loginInfo, entryType, dummyRequestBody);
      });

      describe('in the received response', function () {
        describe("in the key-value pair whose key is 'name'", function () {
          const key = 'name';

          it('the key should exist', function () {
            const keyExists = key in responseBody;
            expect(keyExists).to.be.true;
          });

          it('the value should match the expected value', function () {
            const receivedValue = responseBody[key];
            const answerKey = dummyRequestBody[key];
            expect(receivedValue).to.deep.equal(answerKey);
          });
        });

        describe("in the key-value pair whose key is 'color'", function () {
          const key = 'color';

          it('the key should exist', function () {
            const keyExists = key in responseBody;
            expect(keyExists).to.be.true;
          });

          describe('the value', function () {
            let receivedValue;

            before(function () {
              receivedValue = responseBody[key];
            });

            it('should be a valid hex color code (without the leading hash)', function () {
              const hexColorCodeRegex = /^[0-9a-fA-F]{6}$/;
              expect(receivedValue).to.match(hexColorCodeRegex);
            });

            it('should match the expected hex color coode (without the leading hash)', function () {
              const answerKey = dummyRequestBody[key].slice(1);
              expect(receivedValue).to.deep.equal(answerKey);
            });
          });
        });

        describe("in the key-value pair whose key is 'description'", function () {
          const key = 'description';

          it('the key should exist', function () {
            const keyExists = key in responseBody;
            expect(keyExists).to.be.true;
          });

          it('the value should match the expected value', function () {
            const receivedValue = responseBody[key];
            const answerKey = dummyRequestBody[key];
            expect(receivedValue).to.deep.equal(answerKey);
          });
        });
      });
    });
  });
});
