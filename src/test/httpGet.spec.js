import { expect } from 'chai';
import nock from 'nock';

import { httpAcceptHeader, httpUriBase } from '../core/apiCallOptions';
import { httpGet } from '../core/apiCallToList';

describe('httpGet', () => {
  before(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock(httpUriBase)
      .get(/\/.*/)
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

  it('should return a function of fetch API', () => {
    expect(httpGet).to.be.a('function');
  });

  describe('when the function is called', () => {
    it('should make an HTTP request and receives an OK status', async () => {
      try {
        const response = await httpGet();
        const okStatus = response.ok;
        expect(okStatus).to.be.true;
      } catch (err) {
        expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
      }
    });

    it('should have used the HTTP GET method', async () => {
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

    it('should have sent the correct HTTP Accept header', async () => {
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
});
