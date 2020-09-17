import { expect } from 'chai';

import { httpUriBase } from '../core/apiCallOptions';

describe('The httpUriBase', function () {
  it('should be a string', function () {
    expect(httpUriBase).to.be.a('string');
  });

  it('should have a length > 0', function () {
    expect(httpUriBase).to.have.lengthOf.above(0);
  });

  it('should match the expected value', function () {
    const answerKey = 'https://api.github.com/repos/';
    expect(httpUriBase).to.deep.equal(answerKey);
  });
});
