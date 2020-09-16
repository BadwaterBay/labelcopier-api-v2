import { expect } from 'chai';

import { httpAcceptHeader } from '../core/apiCallOptions';

suite('Test httpAcceptHeader', () => {
  test('It is a string', () => {
    expect(httpAcceptHeader).to.be.a('string');
  });

  test('It has a length greater than 0', () => {
    expect(httpAcceptHeader).to.have.lengthOf.above(0);
  });

  test('It matches the expected value', () => {
    const answerKey = 'application/vnd.github.v3+json';
    expect(httpAcceptHeader).to.deep.equal(answerKey);
  });
});
