import { expect } from 'chai';

import { getBaseApiUriSlashRepos } from '../../core/httpRequests/httpRequestUriBuilder';

describe('The getBaseApiUriSlashRepos', function () {
  it('should return a string', function () {
    expect(getBaseApiUriSlashRepos()).to.be.a('string');
  });

  it('should return a string with a length > 0', function () {
    expect(getBaseApiUriSlashRepos()).to.have.lengthOf.above(0);
  });

  it('should return a string that matches the expected value', function () {
    const answerKey = 'https://api.github.com/repos';
    expect(getBaseApiUriSlashRepos()).to.deep.equal(answerKey);
  });
});
