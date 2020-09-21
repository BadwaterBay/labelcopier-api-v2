import { expect } from 'chai';

import { buildUriToListMilestones } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The buildUriToListMilestones', function () {
  const input = 'https://api.github.com';
  let output;

  beforeEach(function () {
    output = buildUriToListMilestones(input);
  });

  it('should return a string', function () {
    expect(output).to.be.a('string');
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = `${input}&state=all`;
    expect(output).to.deep.equal(answerKey);
  });
});
