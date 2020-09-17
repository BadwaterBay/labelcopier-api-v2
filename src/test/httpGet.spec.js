import { expect } from 'chai';
import nock from 'nock';

import { httpAcceptHeader, httpUriBase } from '../core/apiCallOptions';
import { httpGet } from '../core/apiCallToList';

describe('Test httpGet', function () {
  before(function () {
    nock.disableNetConnect();
  });

  beforeEach(function () {
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

  after(function () {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('the return value', function () {
    it('should return a function', function () {
      expect(httpGet).to.be.a('function');
    });
  });

  describe('when the function is called', function () {
    it('should not throw an error', function () {
      expect(() => httpGet()).to.not.throw();
    });

    describe('waiting for the HTTP response', function () {
      let response;

      before(async function () {
        response = await httpGet();
      });

      it('should receives an OK status', async function () {
        const okStatus = response.ok;
        expect(okStatus).to.be.true;
      });

      describe('the parsed response body', function () {
        let responseBody;

        before(async function () {
          responseBody = await response.json();
        });

        it('should have used the HTTP GET method', async function () {
          const httpMethodUsed = responseBody.method;
          const answerKey = 'GET';
          expect(httpMethodUsed).to.deep.equal(answerKey);
        });

        it('should have sent the correct HTTP Accept header', async function () {
          const acceptHeaderSent = responseBody.requestHeader.accept[0];
          const answerKey = httpAcceptHeader;
          expect(acceptHeaderSent).to.deep.equal(answerKey);
        });
      });
    });
  });
});
