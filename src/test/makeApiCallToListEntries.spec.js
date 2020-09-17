import { expect } from 'chai';
import nock from 'nock';

import { httpUriBase } from '../core/apiCallOptions';
import { makeApiCallToListEntries } from '../core/apiCallToList';

describe('Test makeApiCallToListEntries', function () {
  describe('when the function is called', function () {
    const sampleArray = [1, 2];

    before(function () {
      nock.disableNetConnect();
    });

    beforeEach(function () {
      nock(httpUriBase).get(/\/.*/).reply(200, sampleArray);
    });

    after(function () {
      nock.cleanAll();
      nock.enableNetConnect();
    });

    it('should not throw an error', function () {
      expect(() => makeApiCallToListEntries()).to.not.throw();
    });

    describe('the return value', function () {
      it('should be an array', async function () {
        expect(await makeApiCallToListEntries()).to.be.an('array');
      });

      it('should match the expected value', async function () {
        const answerKey = sampleArray;
        expect(await makeApiCallToListEntries()).to.deep.equal(answerKey);
      });
    });
  });
});
