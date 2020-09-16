import { expect } from 'chai';
import 'regenerator-runtime';

import { apiPaginationLimit } from '../core/apiCallOptions';

describe('Test apiPaginationLimit', () => {
  it('It is a number', () => {
    expect(apiPaginationLimit).to.be.a('number');
  });

  it('It is >= 1 and <= 100', () => {
    expect(apiPaginationLimit).to.be.within(1, 100);
  });

  it('It is 100', () => {
    expect(apiPaginationLimit).to.deep.equal(100);
  });
});
