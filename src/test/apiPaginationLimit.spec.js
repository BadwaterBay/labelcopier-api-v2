import { expect } from 'chai';

import { apiPaginationLimit } from '../core/apiCallOptions';

describe('apiPaginationLimit', () => {
  it('shoud be a number', () => {
    expect(apiPaginationLimit).to.be.a('number');
  });

  it('should be >= 1 and <= 100', () => {
    expect(apiPaginationLimit).to.be.within(1, 100);
  });

  it('should be 100', () => {
    expect(apiPaginationLimit).to.deep.equal(100);
  });
});
