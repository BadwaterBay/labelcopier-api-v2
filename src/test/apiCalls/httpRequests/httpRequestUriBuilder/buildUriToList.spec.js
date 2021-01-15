import { expect } from 'chai';

import { buildUriToList } from '../../../../core/apiCalls/httpRequests/httpRequestUriBuilder';

describe('The getUriBuilderOfListing', function () {
  let output;

  describe("with action parameter 'labels'", function () {
    const uri = 'https://api.github.com/repos/repo-owner/repo-name/labels';
    const entryType = 'labels';

    before(function () {
      output = buildUriToList(uri, entryType);
    });

    it('should return a string', function () {
      expect(output).to.be.a('string');
    });

    it('should return a string that matches the expected value', function () {
      const answerKey =
        'https://api.github.com/repos/repo-owner/repo-name/labels?per_page=100&page=1';
      expect(output).to.deep.equal(answerKey);
    });
  });

  describe("with action parameter 'milestones'", function () {
    const uri = 'https://api.github.com/repos/repo-owner/repo-name/milestones';
    const entryType = 'milestones';

    before(function () {
      output = buildUriToList(uri, entryType);
    });

    it('should return a string', function () {
      expect(output).to.be.a('string');
    });

    it('should return a string that matches the expected value', function () {
      const answerKey =
        'https://api.github.com/repos/repo-owner/repo-name/milestones?per_page=100&page=1&state=all';
      expect(output).to.deep.equal(answerKey);
    });
  });
});
