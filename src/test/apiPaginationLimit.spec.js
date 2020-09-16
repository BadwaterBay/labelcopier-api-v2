import { expect } from 'chai';

import { apiPaginationLimit } from '../core/apiCallOptions';

suite('Test apiPaginationLimit', () => {
  test('It is a number', () => {
    expect(apiPaginationLimit).to.be.a('number');
  });

  test('It is >= 1 and <= 100', () => {
    expect(apiPaginationLimit).to.be.within(1, 100);
  });

  test('It is 100', () => {
    expect(apiPaginationLimit).to.deep.equal(100);
  });
});
