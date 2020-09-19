import { expect } from 'chai';

import { apiPaginationLimit, apiUriBaseRepos } from '../core/apiCallOptions';
import { buildUriForHttpGet } from '../core/apiCallToGet';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
} from './dummyData/dummyLoginInfo';

describe('Test buildUriForHttpGet', function () {
  let homeRepoOwner;
  let homeRepoName;
  let templateRepoOwner;
  let templateRepoName;

  before(function () {
    homeRepoOwner = loadHomeRepoOwnerFromEnv();
    homeRepoName = loadHomeRepoNameFromEnv();
    templateRepoOwner = 'template-repo-owner';
    templateRepoName = 'template-repo-name';
  });

  describe('with no arguments specified', function () {
    describe('the return value', function () {
      it('should be a string', function () {
        const output = buildUriForHttpGet();
        expect(output).to.be.a('string');
      });

      it('should have a length > 56', function () {
        const output = buildUriForHttpGet();
        expect(output).to.have.lengthOf.above(56);
      });

      it('should match the expected value', function () {
        const output = buildUriForHttpGet();

        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/labels?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'labels'", function () {
    const firstArgument = 'labels';
    const kind = firstArgument;

    it('should match the expected value', function () {
      const output = buildUriForHttpGet(firstArgument);

      const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

      expect(output).to.deep.equal(answerKey);
    });

    describe("with the second argument being 'list'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'list';
        const output = buildUriForHttpGet(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'copy'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'copy';
        const output = buildUriForHttpGet(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${templateRepoOwner}/${templateRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'milestones'", function () {
    const firstArgument = 'milestones';
    const kind = firstArgument;

    it('should match the expected value', function () {
      const output = buildUriForHttpGet(firstArgument);

      const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    describe("with the second argument being 'list'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'list';
        const output = buildUriForHttpGet(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe("with the second argument being 'copy'", function () {
      it('should match the expected value', function () {
        const secondArgument = 'copy';
        const output = buildUriForHttpGet(firstArgument, secondArgument);

        const answerKey = `${apiUriBaseRepos}/${templateRepoOwner}/${templateRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
