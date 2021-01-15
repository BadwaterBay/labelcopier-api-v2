import { expect } from 'chai';

import { buildUriForHttpRequest } from '../../../../core/apiCalls/httpRequests/httpRequestUriBuilder';

import {
  loadHomeRepoOwnerFromDotEnv,
  loadHomeRepoNameFromDotEnv,
  loadTemplateRepoOwnerFromDotEnv,
  loadTemplateRepoNameFromDotEnv,
  getDummyLoginInfo,
} from '../../../dummyData/dummyLoginInfo.setup.test';

describe('Test buildUriForHttpRequest', function () {
  let homeRepoOwner;
  let homeRepoName;
  let templateRepoOwner;
  let templateRepoName;
  let loginInfo;
  const apiPaginationLimit = 100;
  const baseApiUriSlashRepos = 'https://api.github.com/repos';

  before(function () {
    homeRepoOwner = loadHomeRepoOwnerFromDotEnv();
    homeRepoName = loadHomeRepoNameFromDotEnv();
    templateRepoOwner = loadTemplateRepoOwnerFromDotEnv();
    templateRepoName = loadTemplateRepoNameFromDotEnv();
    loginInfo = getDummyLoginInfo();
  });

  describe("with entryType being 'labels'", function () {
    const entryType = 'labels';

    describe("with action being 'list'", function () {
      it('should match the expected value', function () {
        const action = 'list';
        const output = buildUriForHttpRequest(loginInfo, entryType, action);
        const answerKey = `${baseApiUriSlashRepos}/${homeRepoOwner}/${homeRepoName}/${entryType}?per_page=${apiPaginationLimit}&page=1`;
        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with action being 'copy'", function () {
      it('should match the expected value', function () {
        const action = 'copy';
        const output = buildUriForHttpRequest(loginInfo, entryType, action);
        const answerKey = `${baseApiUriSlashRepos}/${templateRepoOwner}/${templateRepoName}/${entryType}?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with entryType being 'milestones'", function () {
    const entryType = 'milestones';

    describe("with action being 'list'", function () {
      it('should match the expected value', function () {
        const action = 'list';
        const output = buildUriForHttpRequest(loginInfo, entryType, action);
        const answerKey = `${baseApiUriSlashRepos}/${homeRepoOwner}/${homeRepoName}/${entryType}?per_page=${apiPaginationLimit}&page=1&state=all`;
        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with action being 'copy'", function () {
      it('should match the expected value', function () {
        const action = 'copy';
        const output = buildUriForHttpRequest(loginInfo, entryType, action);
        const answerKey = `${baseApiUriSlashRepos}/${templateRepoOwner}/${templateRepoName}/${entryType}?per_page=${apiPaginationLimit}&page=1&state=all`;
        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
