import { expect } from 'chai';

import { getBaseApiUri } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The getBaseApiUri', function () {
  it('should return a string', function () {
    expect(getBaseApiUri()).to.be.a('string');
  });

  it('should return a string with a length > 0', function () {
    expect(getBaseApiUri()).to.have.lengthOf.above(0);
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = 'https://api.github.com';
    expect(getBaseApiUri()).to.deep.equal(answerKey);
  });
});
