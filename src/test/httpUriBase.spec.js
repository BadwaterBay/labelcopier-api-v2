import { expect } from 'chai';

import { apiUriBaseRepos } from '../core/apiCallOptions';

describe('The apiUriBaseRepos', function () {
  it('should be a string', function () {
    expect(apiUriBaseRepos).to.be.a('string');
  });

  it('should have a length > 0', function () {
    expect(apiUriBaseRepos).to.have.lengthOf.above(0);
  });

  it('should match the expected value', function () {
    const answerKey = 'https://api.github.com/repos';
    expect(apiUriBaseRepos).to.deep.equal(answerKey);
  });
});
