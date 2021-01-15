import { expect } from 'chai';

import { getRepoOwnerAndRepoName } from '../../core/loginInfo';
import {
  loadHomeRepoOwnerFromDotEnv,
  loadHomeRepoNameFromDotEnv,
  loadTemplateRepoOwnerFromDotEnv,
  loadTemplateRepoNameFromDotEnv,
  getDummyLoginInfo,
} from '../dummyData/dummyLoginInfo.setup.test';

describe('Test getRepoOwnerAndRepoName', function () {
  let loginInfo;
  let action;
  let output;

  beforeEach(function () {
    loginInfo = getDummyLoginInfo();
    output = getRepoOwnerAndRepoName(loginInfo, action);
  });

  describe("with action being 'list'", function () {
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

  describe("with action being 'copy'", function () {
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
        const answerKey = loadTemplateRepoOwnerFromDotEnv();
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
        const answerKey = loadTemplateRepoNameFromDotEnv();
        expect(value).to.deep.equal(answerKey);
      });
    });
  });
});
