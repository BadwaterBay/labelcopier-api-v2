import { expect } from 'chai';

import { httpUriBase } from '../core/apiCallOptions';

describe('The httpUriBase', () => {
  it('should be a string', () => {
    expect(httpUriBase).to.be.a('string');
  });

  it('should have a length > 0', () => {
    expect(httpUriBase).to.have.lengthOf.above(0);
  });

  it('should match the expected value', () => {
    const answerKey = 'https://api.github.com/repos/';
    expect(httpUriBase).to.deep.equal(answerKey);
  });
});
