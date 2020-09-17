import { expect } from 'chai';

import { httpUriBase } from '../core/apiCallOptions';
import { composeUrlForCreatingEntries } from '../core/apiCallToCreate';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUrlForCreatingEntries', function () {
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  describe('with no arguments specified', function () {
    describe('the return value', function () {
      const output = composeUrlForCreatingEntries();

      it('should be a string', function () {
        expect(output).to.be.a('string');
      });

      it('should have a length > 42', function () {
        expect(output).to.have.lengthOf.above(42);
      });

      it('should match the expected value', function () {
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;
        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'labels'", function () {
    describe('the return value', function () {
      const output = composeUrlForCreatingEntries('labels');

      it('should match the expected value', function () {
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;
        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'milestones'", function () {
    describe('the return value', function () {
      const output = composeUrlForCreatingEntries('milestones');

      it('should match the expected value', function () {
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/milestones`;
        expect(output).to.deep.equal(answerKey);
      });
    });
  });
});
