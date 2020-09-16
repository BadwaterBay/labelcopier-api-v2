import { expect } from 'chai';
import nock from 'nock';

import { httpUriBase } from '../core/apiCallOptions';
import { makeApiCallToListEntries } from '../core/apiCallToList';

suite('Test makeApiCallToListEntries', () => {
  suiteSetup(() => {
    nock.disableNetConnect();
  });

  setup(() => {
    nock(httpUriBase).get(/\/.*/).reply(200, [1, 2]);
  });

  suiteTeardown(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('Make a GET HTTP request and receives an array', async () => {
    try {
      const fetchedArray = await makeApiCallToListEntries();
      expect(fetchedArray).to.be.an('array');
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  test('Verify the content of the array', async () => {
    try {
      const fetchedArray = await makeApiCallToListEntries();
      const answerKey = [1, 2];
      expect(fetchedArray).to.deep.equal(answerKey);
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });
});
