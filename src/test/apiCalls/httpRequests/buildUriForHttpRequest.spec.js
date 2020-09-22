import { expect } from 'chai';

import {
  getApiPaginationLimit,
  getBaseApiUriSlashRepos,
  buildUriForHttpRequest,
} from '../../../core/apiCalls/httpRequests/httpRequestUriBuilder';

import {
  loadHomeRepoOwnerFromDotEnv,
  loadHomeRepoNameFromDotEnv,
  loadOtherRepoOwnerFromDotEnv,
  loadOtherRepoNameFromDotEnv,
} from '../../dummyData/dummyLoginInfo.setup.test';

describe('Test buildUriForHttpRequest', function () {
  let homeRepoOwner;
  let homeRepoName;
  let otherRepoOwner;
  let otherRepoName;

  before(function () {
    homeRepoOwner = loadHomeRepoOwnerFromDotEnv();
    homeRepoName = loadHomeRepoNameFromDotEnv();
    otherRepoOwner = loadOtherRepoOwnerFromDotEnv();
    otherRepoName = loadOtherRepoNameFromDotEnv();
  });

  describe("with the first argument being 'labels'", function () {
    const firstArgument = 'labels';
    const entryType = firstArgument;

    describe("with the second argument being 'list'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'list';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${getBaseApiUriSlashRepos()}/${homeRepoOwner}/${homeRepoName}/${entryType}?per_page=${getApiPaginationLimit()}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'copy'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'copy';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${getBaseApiUriSlashRepos()}/${otherRepoOwner}/${otherRepoName}/${entryType}?per_page=${getApiPaginationLimit()}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'milestones'", function () {
    const firstArgument = 'milestones';
    const entryType = firstArgument;

    describe("with the second argument being 'list'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'list';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${getBaseApiUriSlashRepos()}/${homeRepoOwner}/${homeRepoName}/${entryType}?per_page=${getApiPaginationLimit()}&page=1&state=all`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'copy'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'copy';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${getBaseApiUriSlashRepos()}/${otherRepoOwner}/${otherRepoName}/${entryType}?per_page=${getApiPaginationLimit()}&page=1&state=all`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
