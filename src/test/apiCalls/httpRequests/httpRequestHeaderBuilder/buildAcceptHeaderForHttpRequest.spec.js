import { expect } from 'chai';

import { buildAcceptHeaderForHttpRequest } from '../../../../core/apiCalls/httpRequests/httpRequestHeaderBuilder';

describe('The buildAcceptHeaderForHttpRequest', function () {
  let output;

  beforeEach(function () {
    output = buildAcceptHeaderForHttpRequest();
  });

  it('should be a string', function () {
    expect(output).to.be.a('string');
  });

  it('should match the expected value', function () {
    const answerKey = 'application/vnd.github.v3+json';
    expect(output).to.deep.equal(answerKey);
  });
});
