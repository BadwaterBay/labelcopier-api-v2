import { expect } from 'chai';

import { getBaseApiUriSlashRepos } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The getBaseApiUriSlashRepos', function () {
  let output;

  before(function () {
    output = getBaseApiUriSlashRepos();
  });

  it('should return a string', function () {
    expect(output).to.be.a('string');
  });

  it('should return a string with a length > 0', function () {
    expect(output).to.have.lengthOf.above(0);
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = 'https://api.github.com/repos';
    expect(output).to.deep.equal(answerKey);
  });
});
