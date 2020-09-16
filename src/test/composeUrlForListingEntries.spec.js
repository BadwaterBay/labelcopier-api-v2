import { expect } from 'chai';

import { apiPaginationLimit, httpUriBase } from '../core/apiCallOptions';
import { composeUrlForListingEntries } from '../core/apiCallToList';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUrlForListingEntries', () => {
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  const templateRepoOwner = 'template-repo-owner';
  const templateRepoName = 'template-repo-name';

  describe('with no arguments specified', () => {
    describe('the return value', () => {
      it('should be a string', () => {
        const output = composeUrlForListingEntries();
        expect(output).to.be.a('string');
      });

      it('should have a length > 56', () => {
        const output = composeUrlForListingEntries();
        expect(output).to.have.lengthOf.above(56);
      });

      it('should match the expected value', () => {
        const output = composeUrlForListingEntries();

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels?per_page=${apiPaginationLimit}&page=1`;

        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with the first argument being 'labels'", () => {
    const firstArgument = 'labels';
    const kind = firstArgument;

    it('should match the expected value', () => {
      const output = composeUrlForListingEntries(firstArgument);

      const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

      expect(output).to.deep.equal(answerKey);
    });

    describe('with the second argument being 1', () => {
      const secondArgument = 1;
      const pageNum = secondArgument;

      it('should match the expected value', () => {
        const output = composeUrlForListingEntries(firstArgument, secondArgument);

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe('with the second argument being 12', () => {
      const secondArgument = 12;
      const pageNum = secondArgument;

      it('should match the expected value', () => {
        const output = composeUrlForListingEntries(firstArgument, secondArgument);

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}`;

        expect(output).to.deep.equal(answerKey);
      });

      describe("with the third argument being 'list'", () => {
        const thirdArgument = 'list';

        it('should match the expected value', () => {
          const output = composeUrlForListingEntries(
            firstArgument,
            secondArgument,
            thirdArgument
          );

          const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}`;

          expect(output).to.deep.equal(answerKey);
        });
      });

      describe("with the third argument being 'copy'", () => {
        const thirdArgument = 'copy';

        it('should match the expected value', () => {
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

  describe("with the first argument being 'milestones'", () => {
    const firstArgument = 'milestones';
    const kind = firstArgument;

    it('should match the expected value', () => {
      const output = composeUrlForListingEntries(firstArgument);

      const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    describe('with the second argument being 1', () => {
      const secondArgument = 1;
      const pageNum = secondArgument;

      it('should match the expected value', () => {
        const output = composeUrlForListingEntries(firstArgument, secondArgument);

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}&state=all`;

        expect(output).to.deep.equal(answerKey);
      });
    });

    describe('with the second argument being 12', () => {
      const secondArgument = 12;
      const pageNum = secondArgument;

      it('should match the expected value', () => {
        const output = composeUrlForListingEntries(firstArgument, secondArgument);

        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}&state=all`;

        expect(output).to.deep.equal(answerKey);
      });

      describe("with the third argument being 'list'", () => {
        const thirdArgument = 'list';

        it('should match the expected value', () => {
          const output = composeUrlForListingEntries(
            firstArgument,
            secondArgument,
            thirdArgument
          );

          const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=${pageNum}&state=all`;

          expect(output).to.deep.equal(answerKey);
        });
      });

      describe("with the third argument being 'copy'", () => {
        const thirdArgument = 'copy';
        it('should match the expected value', () => {
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

  describe('with an invalid argument', () => {
    it('should throw an error', () => {
      expect(() => composeUrlForListingEntries('invalid-kind')).to.throw(
        Error,
        /invalid kind/i
      );
    });

    it('should throw an error', () => {
      expect(() => composeUrlForListingEntries('labels', 1, 'invalid-mode')).to.throw(
        Error,
        /invalid mode/i
      );
    });
  });
});
