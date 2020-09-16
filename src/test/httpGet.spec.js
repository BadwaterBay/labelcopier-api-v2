import { expect } from 'chai';
import nock from 'nock';
import 'regenerator-runtime';

import { httpAcceptHeader } from '../core/apiCallOptions';
import { httpGet } from '../core/apiCallToList';

describe('Test httpGet', () => {
  before(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock('https://api.github.com')
      .get(/\/repos\/.*/)
      .reply(200, function (uri) {
        return {
          requestUri: uri,
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
