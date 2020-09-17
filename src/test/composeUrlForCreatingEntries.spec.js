import { expect } from 'chai';

import { httpUriBase } from '../core/apiCallOptions';
import { composeUrlForCreatingEntries } from '../core/apiCallToCreate';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUrlForCreatingEntries', function () {
  let homeRepoOwner;
  let homeRepoName;

  before(function () {
    homeRepoOwner = loadHomeRepoOwnerFromEnv();
    homeRepoName = loadHomeRepoNameFromEnv();
  });

  describe('with no arguments specified', function () {
    describe('the return value', function () {
      let url;

      before(function () {
        url = composeUrlForCreatingEntries();
      });

      it('should be a string', function () {
        expect(url).to.be.a('string');
      });

      it('should have a length > 42', function () {
        expect(url).to.have.lengthOf.above(42);
      });

      it('should match the expected value', function () {
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;
        expect(url).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'labels'", function () {
    describe('the return value', function () {
      it('should match the expected value', function () {
        const url = composeUrlForCreatingEntries('labels');
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;
        expect(url).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'milestones'", function () {
    describe('the return value', function () {
      it('should match the expected value', function () {
        const url = composeUrlForCreatingEntries('milestones');
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/milestones`;
        expect(url).to.deep.equal(answerKey);
      });
    });
  });
});
