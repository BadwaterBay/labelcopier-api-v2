import { expect } from 'chai';

import { apiPaginationLimit } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The apiPaginationLimit', function () {
  it('shoud be a number', function () {
    expect(apiPaginationLimit).to.be.a('number');
  });

  it('should be >= 1 and <= 100', function () {
    expect(apiPaginationLimit).to.be.within(1, 100);
  });

  it('should be exactly 100', function () {
    expect(apiPaginationLimit).to.deep.equal(100);
  });
});
