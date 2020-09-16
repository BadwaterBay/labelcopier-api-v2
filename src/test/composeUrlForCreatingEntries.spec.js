import { expect } from 'chai';

import { httpUriBase } from '../core/apiCallOptions';
import { composeUrlForCreatingEntries } from '../core/apiCallToCreate';
import { loadHomeRepoOwnerFromEnv, loadHomeRepoNameFromEnv } from './dummyData';

describe('Test composeUrlForCreatingEntries', () => {
  const homeRepoOwner = loadHomeRepoOwnerFromEnv();
  const homeRepoName = loadHomeRepoNameFromEnv();

  describe('with no arguments specified', () => {
    describe('the return value', () => {
      it('should be a string', () => {
        const output = composeUrlForCreatingEntries();
        expect(output).to.be.a('string');
      });

      it('should have a length > 42', () => {
        const output = composeUrlForCreatingEntries();
        expect(output).to.have.lengthOf.above(42);
      });

      it('should match the expected value', () => {
        const output = composeUrlForCreatingEntries();
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;
        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'labels'", () => {
    describe('the return value', () => {
      it('should match the expected value', () => {
        const output = composeUrlForCreatingEntries('labels');
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/labels`;
        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'milestones'", () => {
    describe('the return value', () => {
      it('should match the expected value', () => {
        const output = composeUrlForCreatingEntries('milestones');
        const answerKey = `${httpUriBase}${homeRepoOwner}/${homeRepoName}/milestones`;
        expect(output).to.deep.equal(answerKey);
      });
    });
  });

  describe('with an invalid argument', () => {
    it('should throw an error', () => {
      expect(() => composeUrlForCreatingEntries('invalid-kind')).to.throw(
        Error,
        /invalid kind/i
      );
    });
  });
});
