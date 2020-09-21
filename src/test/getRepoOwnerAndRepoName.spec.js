import { expect } from 'chai';

import { getRepoOwnerAndRepoName } from '../core/loginInfo';
import {
  loadHomeRepoOwnerFromDotEnv,
  loadHomeRepoNameFromDotEnv,
  loadOtherRepoOwnerFromDotEnv,
  loadOtherRepoNameFromDotEnv,
} from './dummyData/dummyLoginInfo';

describe('Test getRepoOwnerAndRepoName', function () {
  let action;
  let output;

  beforeEach(function () {
    output = getRepoOwnerAndRepoName(action);
  });

  describe("with argument 'list'", function () {
    before(function () {
      action = 'list';
    });

    it('should be an object', function () {
      expect(output).to.be.an('object');
    });

    it("should contain a key called 'repoOwner'", function () {
      const keyExists = 'repoOwner' in output;
      expect(keyExists).to.be.true;
    });

    describe("the value of 'repoOwner'", function () {
      it('should match the expected value', function () {
        const value = output.repoOwner;
        const answerKey = loadHomeRepoOwnerFromDotEnv();
        expect(value).to.deep.equal(answerKey);
      });
    });

    it("should contain a key called 'repoName'", function () {
      const keyExists = 'repoName' in output;
      expect(keyExists).to.be.true;
    });

    describe("the value of 'repoName'", function () {
      it('should match the expected value', function () {
        const value = output.repoName;
        const answerKey = loadHomeRepoNameFromDotEnv();
        expect(value).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'copy'", function () {
    before(function () {
      action = 'copy';
    });

    it('should be an object', function () {
      expect(output).to.be.an('object');
    });

    it("should contain a key called 'repoOwner'", function () {
      const keyExists = 'repoOwner' in output;
      expect(keyExists).to.be.true;
    });

    describe("the value of 'repoOwner'", function () {
      it('should match the expected value', function () {
        const value = output.repoOwner;
        const answerKey = loadOtherRepoOwnerFromDotEnv();
        expect(value).to.deep.equal(answerKey);
      });
    });

    it("should contain a key called 'repoName'", function () {
      const keyExists = 'repoName' in output;
      expect(keyExists).to.be.true;
    });

    describe("the value of 'repoName'", function () {
      it('should match the expected value', function () {
        const value = output.repoName;
        const answerKey = loadOtherRepoNameFromDotEnv();
        expect(value).to.deep.equal(answerKey);
      });
    });
  });
});
