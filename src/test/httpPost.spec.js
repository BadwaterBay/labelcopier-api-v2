import { expect } from 'chai';
import nock from 'nock';

import { httpAcceptHeader, httpUriBase } from '../core/apiCallOptions';
import { httpPost } from '../core/apiCallToCreate';

suite('Test httpPost', () => {
  suiteSetup(() => {
    nock.disableNetConnect();
  });

  setup(() => {
    nock(httpUriBase)
      .post(/\/.*/)
      .reply(200, function (uri, requestBody) {
        return {
          requestUri: uri,
          method: this.req.method,
          requestHeader: this.req.headers,
          requestBody,
        };
      });
  });

  suiteTeardown(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('Returns a function of fetch API', () => {
    expect(httpPost).to.be.a('function');
  });

  test('Call the function, make an HTTP request and receives an OK status', async () => {
    try {
      const response = await httpPost();
      const okStatus = response.ok;
      expect(okStatus).to.be.true;
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  test("The HTTP request used the 'POST' method", async () => {
    try {
      const response = await httpPost();
      const responseBody = await response.json();
      const acceptHeaderSent = responseBody.method;
      const answerKey = 'POST';
      expect(acceptHeaderSent).to.deep.equal(answerKey);
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  test('The HTTP request sent the correct Accept header', async () => {
    try {
      const response = await httpPost();
      const responseBody = await response.json();
      const acceptHeaderSent = responseBody.requestHeader.accept[0];
      const answerKey = httpAcceptHeader;
      expect(acceptHeaderSent).to.deep.equal(answerKey);
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  test('The sent HTTP request body is a string', async () => {
    try {
      const response = await httpPost();
      const responseBody = await response.json();
      const requestBodySent = responseBody.requestBody;
      expect(requestBodySent).to.be.a('string');
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });
});
