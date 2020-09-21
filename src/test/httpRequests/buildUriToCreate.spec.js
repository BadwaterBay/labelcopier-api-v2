import { expect } from 'chai';

import { buildUriToCreate } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The buildUriToCreate', function () {
  const input = 'https://api.github.com';
  let output;

  before(function () {
    output = buildUriToCreate(input);
  });

  it('should return a string', function () {
    expect(output).to.be.a('string');
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = input;
    expect(output).to.deep.equal(answerKey);
  });
});
