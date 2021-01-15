import { expect } from 'chai';

import { getBaseApiUriSlashRepos } from '../../../../core/apiCalls/httpRequests/httpRequestUriBuilder';

describe('The getBaseApiUriSlashRepos', function () {
  let output;

  beforeEach(function () {
    output = getBaseApiUriSlashRepos();
  });

  it('should return a string', function () {
    expect(output).to.be.a('string');
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = 'https://api.github.com/repos';
    expect(output).to.deep.equal(answerKey);
  });
});
