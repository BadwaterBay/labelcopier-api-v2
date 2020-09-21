import { expect } from 'chai';

import { getApiPaginationLimit } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The getApiPaginationLimit', function () {
  let output;

  beforeEach(function () {
    output = getApiPaginationLimit();
  });

  it('shoud return a number', function () {
    expect(output).to.be.a('number');
  });

  it('should return a number that is >= 1 and <= 100', function () {
    expect(output).to.be.within(1, 100);
  });

  it('should return a number that is exactly 100', function () {
    expect(output).to.deep.equal(100);
  });
});
