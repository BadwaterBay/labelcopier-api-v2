import { expect } from 'chai';
import nock from 'nock';

import { httpAcceptHeader, apiUriBase } from '../core/apiCallOptions';
import { httpPost } from '../core/apiCallToCreate';

describe('Test httpPost', function () {
  before(function () {
    nock.disableNetConnect();
  });

  beforeEach(function () {
    nock(apiUriBase)
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

  after(function () {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('the return value', function () {
    it('should be a function', function () {
      expect(httpPost).to.be.a('function');
    });
  });

  describe('when the function is called', function () {
    it('should not throw an error', function () {
      expect(() => httpPost()).to.not.throw();
    });

    describe('waiting for the HTTP response', function () {
      let response;

      before(async function () {
        response = await httpPost();
      });

      it('should receive an OK status', async function () {
        const okStatus = response.ok;
        expect(okStatus).to.be.true;
      });

      describe('the parsed response body', function () {
        let responseBody;

        before(async function () {
          responseBody = await response.json();
        });

        it('should have used the HTTP POST method', function () {
          const acceptHeaderSent = responseBody.method;
          const answerKey = 'POST';
          expect(acceptHeaderSent).to.deep.equal(answerKey);
        });

        it('should have sent the correct HTTP Accept header', function () {
          const httpMethodUsed = responseBody.requestHeader.accept[0];
          const answerKey = httpAcceptHeader;
          expect(httpMethodUsed).to.deep.equal(answerKey);
        });

        it('should have sent the HTTP body as a string', function () {
          const requestBodySent = responseBody.requestBody;
          expect(requestBodySent).to.be.a('string');
        });
      });
    });
  });
});
