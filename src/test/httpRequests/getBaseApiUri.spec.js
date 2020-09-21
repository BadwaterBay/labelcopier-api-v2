import { expect } from 'chai';

import { getBaseApiUri } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The getBaseApiUri', function () {
  let output;

  before(function () {
    output = getBaseApiUri();
  });

  it('should return a string', function () {
    expect(output).to.be.a('string');
  });

  it('should return a string with a length > 0', function () {
    expect(output).to.have.lengthOf.above(0);
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = 'https://api.github.com';
    expect(output).to.deep.equal(answerKey);
  });
});
