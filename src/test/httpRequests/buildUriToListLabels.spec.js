import { expect } from 'chai';

import { buildUriToListLabels } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The buildUriToListLabels', function () {
  const input = 'https://api.github.com';
  let output;

  before(function () {
    output = buildUriToListLabels(input);
  });

  it('should return a string', function () {
    expect(output).to.be.a('string');
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = input;
    expect(output).to.deep.equal(answerKey);
  });
});
