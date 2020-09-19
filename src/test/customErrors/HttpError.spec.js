import { expect } from 'chai';

import HttpError from '../../core/customErrors/HttpError';

describe('Test HttpError', function () {
  describe('the returned error', function () {
    let error;

    beforeEach(function () {
      error = new HttpError();
    });

    it('should be an instance of Error', function () {
      const isAnInstanceOfError = error instanceof Error;
      expect(isAnInstanceOfError).to.be.true;
    });

    it("should have name 'HttpError'", function () {
      expect(error.name).to.deep.equal('HttpError');
    });
  });

  describe('when passed with an empty failed HTTP response', function () {
    let error;

    beforeEach(function () {
      const response = {};
      error = new HttpError(response);
    });

    it('should have a null status code', function () {
      expect(error.status).to.be.null;
    });

    it('should return the default error message', function () {
      const answerKey = 'HTTP request failed';
      expect(error.message).to.deep.equal(answerKey);
    });
  });

  describe('when passed with a valid failed HTTP response', function () {
    let error;

    const response = {
      status: 404,
      statusText: 'Not found',
    };

    beforeEach(function () {
      error = new HttpError(response);
    });

    it('should return the expected status code', function () {
      expect(error.status).to.deep.equal(response.status);
    });

    it('should return the expected error message', function () {
      const answerKey = 'HTTP request failed with status code 404 due to: Not found';
      expect(error.message).to.deep.equal(answerKey);
    });
  });
});
