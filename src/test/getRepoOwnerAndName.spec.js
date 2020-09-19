import { expect } from 'chai';

import { getRepoOwnerAndName } from '../core/loginInfo';
import {
  loadHomeRepoOwnerFromEnv,
  loadHomeRepoNameFromEnv,
  loadTemplateRepoOwnerFromEnv,
  loadTemplateRepoNameFromEnv,
} from './dummyData/dummyLoginInfo';

describe('Test getRepoOwnerAndName', function () {
  let mode;
  let output;

  beforeEach(function () {
    output = getRepoOwnerAndName(mode);
  });

  describe("with argument 'list'", function () {
    before(function () {
      mode = 'list';
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
        const answerKey = loadHomeRepoOwnerFromEnv();
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
        const answerKey = loadHomeRepoNameFromEnv();
        expect(value).to.deep.equal(answerKey);
      });
    });
  });

  describe("with argument 'copy'", function () {
    before(function () {
      mode = 'copy';
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
        const answerKey = loadTemplateRepoOwnerFromEnv();
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
        const answerKey = loadTemplateRepoNameFromEnv();
        expect(value).to.deep.equal(answerKey);
      });
    });
  });
});
