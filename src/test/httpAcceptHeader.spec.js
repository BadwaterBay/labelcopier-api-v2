import { expect } from 'chai';

import { httpAcceptHeader } from '../core/apiCallOptions';

describe('httpAcceptHeader', () => {
  it('should be a string', () => {
    expect(httpAcceptHeader).to.be.a('string');
  });

  it('should have a length > 0', () => {
    expect(httpAcceptHeader).to.have.lengthOf.above(0);
  });

  it('should match the expected value', () => {
    const answerKey = 'application/vnd.github.v3+json';
    expect(httpAcceptHeader).to.deep.equal(answerKey);
  });
});
