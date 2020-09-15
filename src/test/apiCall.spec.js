import { expect } from 'chai';
import nock from 'nock';
import 'regenerator-runtime';

import { httpAcceptHeader, httpGet, makeApiCallToListEntries } from '../core/apiCall';

describe('Test httpGet', () => {
  before(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock('https://api.github.com')
      .get(/\/repos\/.*/)
      .reply(200, function (uri) {
        return {
          requestedUri: uri,
          method: this.req.method,
          requestHeader: this.req.headers,
        };
      });
  });

  after(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('Returns a function of fetch API', () => {
    expect(httpGet).to.be.a('function');
  });

  it('Call the function, make an HTTP request and receives an OK status', async () => {
    try {
      const response = await httpGet();
      const okStatus = response.ok;
      expect(okStatus).to.be.true;
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  it("The HTTP request used the 'GET' method", async () => {
    try {
      const response = await httpGet();
      const responseBody = await response.json();

      const acceptHeaderSent = responseBody.method;
      const answerKey = 'GET';
      expect(acceptHeaderSent).to.deep.equal(answerKey);
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  it('The HTTP request sent the correct Accept header', async () => {
    try {
      const response = await httpGet();
      const responseBody = await response.json();

      const acceptHeaderSent = responseBody.requestHeader.accept[0];
      const answerKey = httpAcceptHeader;
      expect(acceptHeaderSent).to.deep.equal(answerKey);
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });
});

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
