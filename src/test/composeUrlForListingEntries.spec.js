import { expect } from 'chai';

import { apiPaginationLimit, httpUriBase } from '../core/apiCallOptions';
import { composeUrlForListingEntries } from '../core/apiCallToList';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUrlForListingEntries', function () {
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
        const output = composeUrlForListingEntries();
        expect(output).to.be.a('string');
      });

      it('should have a length > 56', function () {
        const output = composeUrlForListingEntries();
        expect(output).to.have.lengthOf.above(56);
      });

      it('should match the expected value', function () {
        const output = composeUrlForListingEntries();

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'labels'", function () {
    const firstArgument = 'labels';
    const kind = firstArgument;

    it('should match the expected value', function () {
      const output = composeUrlForListingEntries(firstArgument);

      const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

      expect(output).to.deep.equal(answerKey);
    });

    describe('with the second argument being 12', function () {
      const secondArgument = 12;
      const pageNum = secondArgument;

      it('should match the expected value', function () {
        const output = composeUrlForListingEntries(firstArgument, secondArgument);

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}`;

        expect(output).to.deep.equal(answerKey);
      });

      describe("with the third argument being 'list'", function () {
        const thirdArgument = 'list';

        it('should match the expected value', function () {
          const output = composeUrlForListingEntries(
            firstArgument,
            secondArgument,
            thirdArgument
          );

          const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}`;

          expect(output).to.deep.equal(answerKey);
        });
      });

      describe("with the third argument being 'copy'", function () {
        const thirdArgument = 'copy';

        it('should match the expected value', function () {
          const output = composeUrlForListingEntries(
            firstArgument,
            secondArgument,
            thirdArgument
          );

          const answerKey = `${httpUriBase}${templateRepoOwner}/${templateRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}`;

          expect(output).to.deep.equal(answerKey);
        });
      });
    });
  });

  describe("with the first argument being 'milestones'", function () {
    const firstArgument = 'milestones';
    const kind = firstArgument;

    it('should match the expected value', function () {
      const output = composeUrlForListingEntries(firstArgument);

      const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    describe('with the second argument being 12', function () {
      const secondArgument = 12;
      const pageNum = secondArgument;

      it('should match the expected value', function () {
        const output = composeUrlForListingEntries(firstArgument, secondArgument);

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}&state=all`;

        expect(output).to.deep.equal(answerKey);
      });

      describe("with the third argument being 'list'", function () {
        const thirdArgument = 'list';

        it('should match the expected value', function () {
          const output = composeUrlForListingEntries(
            firstArgument,
            secondArgument,
            thirdArgument
          );

          const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}&state=all`;

          expect(output).to.deep.equal(answerKey);
        });
      });

      describe("with the third argument being 'copy'", function () {
        const thirdArgument = 'copy';
        it('should match the expected value', function () {
          const output = composeUrlForListingEntries(
            firstArgument,
            secondArgument,
            thirdArgument
          );

          const answerKey = `${httpUriBase}${templateRepoOwner}/${templateRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}&state=all`;

          expect(output).to.deep.equal(answerKey);
        });
      });
    });
  });
});
