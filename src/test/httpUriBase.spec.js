import { expect } from 'chai';

import { httpUriBase } from '../core/apiCallOptions';

suite('Test httpUriBase', () => {
  test('It is a string', () => {
    expect(httpUriBase).to.be.a('string');
  });

  test('It has a length greater than 0', () => {
    expect(httpUriBase).to.have.lengthOf.above(0);
  });

  test('It matches the expected value', () => {
    const answerKey = 'https://api.github.com/repos/';
    expect(httpUriBase).to.deep.equal(answerKey);
  });
});
