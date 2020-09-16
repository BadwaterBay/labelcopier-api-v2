import { expect } from 'chai';

import { httpAcceptHeader } from '../core/apiCallOptions';

describe('Test httpAcceptHeader', () => {
  it('It is a string', () => {
    expect(httpAcceptHeader).to.be.a('string');
  });

  it('It has a length greater than 0', () => {
    expect(httpAcceptHeader).to.have.lengthOf.above(0);
  });

  it('It matches the expected value', () => {
    const answerKey = 'application/vnd.github.v3+json';
    expect(httpAcceptHeader).to.deep.equal(answerKey);
  });
});
