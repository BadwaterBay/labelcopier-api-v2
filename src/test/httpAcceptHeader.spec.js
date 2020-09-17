import { expect } from 'chai';

import { httpAcceptHeader } from '../core/apiCallOptions';

describe('The httpAcceptHeader', function () {
  it('should be a string', function () {
    expect(httpAcceptHeader).to.be.a('string');
  });

  it('should have a length > 0', function () {
    expect(httpAcceptHeader).to.have.lengthOf.above(0);
  });

  it('should match the expected value', function () {
    const answerKey = 'application/vnd.github.v3+json';
    expect(httpAcceptHeader).to.deep.equal(answerKey);
  });
});
