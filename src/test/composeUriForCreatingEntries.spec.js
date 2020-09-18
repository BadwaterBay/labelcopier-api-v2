import { expect } from 'chai';

import { apiUriBaseRepos } from '../core/apiCallOptions';
import { composeUriForCreatingEntries } from '../core/apiCallToCreate';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUriForCreatingEntries', function () {
  let homeRepoOwner;
  let homeRepoName;

  before(function () {
    homeRepoOwner = loadHomeRepoOwnerFromEnv();
    homeRepoName = loadHomeRepoNameFromEnv();
  });

  describe('with no arguments specified', function () {
    describe('the return value', function () {
      let uri;

      before(function () {
        uri = composeUriForCreatingEntries();
      });

      it('should be a string', function () {
        expect(uri).to.be.a('string');
      });

      it('should have a length > 42', function () {
        expect(uri).to.have.lengthOf.above(42);
      });

      it('should match the expected value', function () {
        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/labels`;
        expect(uri).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'labels'", function () {
    describe('the return value', function () {
      it('should match the expected value', function () {
        const uri = composeUriForCreatingEntries('labels');
        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/labels`;
        expect(uri).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'milestones'", function () {
    describe('the return value', function () {
      it('should match the expected value', function () {
        const uri = composeUriForCreatingEntries('milestones');
        const answerKey = `${apiUriBaseRepos}/${homeRepoOwner}/${homeRepoName}/milestones`;
        expect(uri).to.deep.equal(answerKey);
      });
    });
  });
});
