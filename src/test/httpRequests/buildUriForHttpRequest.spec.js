import { expect } from 'chai';

import {
  apiPaginationLimit,
  apiUriBaseRepos,
  buildUriForHttpRequest,
} from '../../core/httpRequests/httpRequestUriBuilder';

import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  loadTemplateRepoOwnerFromEnv,
  loadTemplateRepoNameFromEnv,
} from '../dummyData/dummyLoginInfo';

describe('Test buildUriForHttpRequest', function () {
  let homeRepoOwner;
  let homeRepoName;
  let templateRepoOwner;
  let templateRepoName;

  before(function () {
    homeRepoOwner = loadHomeRepoOwnerFromEnv();
    homeRepoName = loadHomeRepoNameFromEnv();
    templateRepoOwner = loadTemplateRepoOwnerFromEnv();
    templateRepoName = loadTemplateRepoNameFromEnv();
  });

  describe('with no arguments specified', function () {
    describe('the return value', function () {
      it('should be a string', function () {
        const output = buildUriForHttpRequest();
        expect(output).to.be.a('string');
      });

      it('should have a length > 56', function () {
        const output = buildUriForHttpRequest();
        expect(output).to.have.lengthOf.above(56);
      });

      it('should match the expected value', function () {
        const output = buildUriForHttpRequest();

        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/labels?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'labels'", function () {
    const firstArgument = 'labels';
    const kind = firstArgument;

    it('should match the expected value', function () {
      const output = buildUriForHttpRequest(firstArgument);

      const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

      expect(output).to.deep.equal(answerKey);
    });

    describe("with the second argument being 'list'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'list';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'copy'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'copy';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${templateRepoOwner}/${templateRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'milestones'", function () {
    const firstArgument = 'milestones';
    const kind = firstArgument;

    it('should match the expected value', function () {
      const output = buildUriForHttpRequest(firstArgument);

      const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    describe("with the second argument being 'list'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'list';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'copy'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'copy';
        const output = buildUriForHttpRequest(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${templateRepoOwner}/${templateRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
