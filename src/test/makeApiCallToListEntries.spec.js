import { expect } from 'chai';
import nock from 'nock';

import { httpUriBase } from '../core/apiCallOptions';
import { makeApiCallToListEntries } from '../core/apiCallToList';

describe('Test makeApiCallToListEntries', () => {
  const sampleArray = [1, 2];

  before(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock(httpUriBase).get(/\/.*/).reply(200, sampleArray);
  });

  after(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('when the function is called', () => {
    it('should return an array', async () => {
      try {
        const fetchedArray = await makeApiCallToListEntries();
        expect(fetchedArray).to.be.an('array');
      } catch (err) {
        expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
      }
    });

    describe('the received array', () => {
      it('should match the expected value', async () => {
        try {
          const fetchedArray = await makeApiCallToListEntries();
          const answerKey = sampleArray;
          expect(fetchedArray).to.deep.equal(answerKey);
        } catch (err) {
          expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
        }
      });
    });
  });
});
