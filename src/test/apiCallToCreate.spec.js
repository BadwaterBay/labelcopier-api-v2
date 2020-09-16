import { expect } from 'chai';
import nock from 'nock';
import 'regenerator-runtime';

import { httpAcceptHeader } from '../core/apiCall';
import { composeUrlForCreatingEntries, httpPost } from '../core/apiCallToCreate';

describe('Test composeUrlForCreatingEntries', () => {
  it('Test the return value is a string', () => {
    const output = composeUrlForCreatingEntries();
    expect(output).to.be.a('string');
  });

  it('Test the return value has a length greater than 42', () => {
    const output = composeUrlForCreatingEntries();
    expect(output).to.have.lengthOf.above(42);
  });

  it('Test the return value with default arguments', () => {
    const output = composeUrlForCreatingEntries();

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('labels')", () => {
    const output = composeUrlForCreatingEntries('labels');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/labels';

    expect(output).to.deep.equal(answerKey);
  });

  it("Test the return value with argument ('milestones')", () => {
    const output = composeUrlForCreatingEntries('milestones');

    const answerKey =
      'https://api.github.com/repos/home-repo-owner/home-repo-name/milestones';

    expect(output).to.deep.equal(answerKey);
  });

  it('Test with an invalid kind, expecting an error to be thrown', () => {
    expect(() => composeUrlForCreatingEntries('invalid-kind')).to.throw(
      Error,
      /invalid kind/i
    );
  });
});

describe('Test httpPost', () => {
  before(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock('https://api.github.com')
      .post(/\/repos\/.*/)
      .reply(200, function (uri, requestBody) {
        return {
          requestUri: uri,
          method: this.req.method,
          requestHeader: this.req.headers,
          requestBody,
        };
      });
  });

  after(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('Returns a function of fetch API', () => {
    expect(httpPost).to.be.a('function');
  });

  it('Call the function, make an HTTP request and receives an OK status', async () => {
    try {
      const response = await httpPost();
      const okStatus = response.ok;
      expect(okStatus).to.be.true;
    } catch (err) {
      expect(err, 'Something went wrong with mocking HTTP requests').to.not.throw();
    }
  });

  it("The HTTP request used the 'POST' method", async () => {
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

  it('The HTTP request sent the correct Accept header', async () => {
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

  it('The sent HTTP request body is a string', async () => {
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
