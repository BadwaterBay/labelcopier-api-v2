import { expect } from 'chai';

import { apiPaginationLimit } from '../core/apiCallOptions';
import { composeUrlForListingEntries } from '../core/apiCallToList';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUrlForListingEntries', () => {
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  describe('Test with no arguments specified (use default values)', () => {
    it('Test the return value is a string', () => {
      const output = composeUrlForListingEntries();
      expect(output).to.be.a('string');
    });

    it('Test the return value has a length greater than 56', () => {
      const output = composeUrlForListingEntries();
      expect(output).to.have.lengthOf.above(56);
    });

    it('Test the return value with default arguments', () => {
      const output = composeUrlForListingEntries();

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/labels?per_page=${apiPaginationLimit}&page=1`;

      expect(output).to.deep.equal(answerKey);
    });
  });

  describe("Test with the first argument being 'labels'", () => {
    const kind = 'labels';

    it("Test the return value with argument ('labels')", () => {
      const output = composeUrlForListingEntries('labels');

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('labels', 1)", () => {
      const output = composeUrlForListingEntries('labels', 1);

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('labels', 23)", () => {
      const output = composeUrlForListingEntries('labels', 23);

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=23`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('labels', 23, 'list')", () => {
      const output = composeUrlForListingEntries('labels', 23, 'list');

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=23`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('labels', 23, 'copy')", () => {
      const output = composeUrlForListingEntries('labels', 23, 'copy');

      const answerKey = `https://api.github.com/repos/template-repo-owner/template-repo-name/${kind}?per_page=${apiPaginationLimit}&page=23`;

      expect(output).to.deep.equal(answerKey);
    });
  });

  describe("Test with the first argument being 'milestones'", () => {
    const kind = 'milestones';

    it("Test the return value with argument ('milestones')", () => {
      const output = composeUrlForListingEntries('milestones');

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('milestones', 1)", () => {
      const output = composeUrlForListingEntries('milestones', 1);

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=1&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('milestones', 29)", () => {
      const output = composeUrlForListingEntries('milestones', 29);

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=29&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('milestones', 29, 'list')", () => {
      const output = composeUrlForListingEntries('milestones', 29, 'list');

      const answerKey = `https://api.github.com/repos/${homeRepoOwner}/${homeRepoName}/${kind}?per_page=${apiPaginationLimit}&page=29&state=all`;

      expect(output).to.deep.equal(answerKey);
    });

    it("Test the return value with argument ('milestones', 29, 'copy')", () => {
      const output = composeUrlForListingEntries('milestones', 29, 'copy');

      const answerKey = `https://api.github.com/repos/template-repo-owner/template-repo-name/${kind}?per_page=${apiPaginationLimit}&page=29&state=all`;

      expect(output).to.deep.equal(answerKey);
    });
  });

  describe('Test invalid cases', () => {
    it('Test with an invalid kind, expecting an error to be thrown', () => {
      expect(() => composeUrlForListingEntries('invalid-kind')).to.throw(
        Error,
        /invalid kind/i
      );
    });

    it('Test with an invalid mode, expecting an error to be thrown', () => {
      expect(() => composeUrlForListingEntries('labels', 1, 'invalid-mode')).to.throw(
        Error,
        /invalid mode/i
      );
    });
  });
});
