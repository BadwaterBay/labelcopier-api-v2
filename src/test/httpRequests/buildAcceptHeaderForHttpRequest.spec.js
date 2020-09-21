import { expect } from 'chai';

import { buildAcceptHeaderForHttpRequest } from '../../core/httpRequests/httpRequestHeaderBuilder';

describe('The buildAcceptHeaderForHttpRequest', function () {
  it('should be a string', function () {
    expect(buildAcceptHeaderForHttpRequest()).to.be.a('string');
  });

  it('should have a length > 0', function () {
    expect(buildAcceptHeaderForHttpRequest()).to.have.lengthOf.above(0);
  });

  it('should match the expected value', function () {
    const answerKey = 'application/vnd.github.v3+json';
    expect(buildAcceptHeaderForHttpRequest()).to.deep.equal(answerKey);
  });
});
