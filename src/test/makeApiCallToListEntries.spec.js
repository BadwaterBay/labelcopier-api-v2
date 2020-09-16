import { expect } from 'chai';
import nock from 'nock';
import 'regenerator-runtime';

import { makeApiCallToListEntries } from '../core/apiCallToList';

describe('Test makeApiCallToListEntries', () => {
  before(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock('https://api.github.com')
      .get(/\/repos\/.*/)
      .reply(200, [1, 2]);
  });

  after(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('Make a GET HTTP request and receives an array', async () => {
    try {
      const fetchedArray = await makeApiCallToListEntries();
      expect(fetchedArray).to.be.an('array');
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  it('Verify the content of the array', async () => {
    try {
      const fetchedArray = await makeApiCallToListEntries();
      const answerKey = [1, 2];
      expect(fetchedArray).to.deep.equal(answerKey);
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });
});
